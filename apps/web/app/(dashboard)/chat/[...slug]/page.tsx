'use client'

import { Button } from "@web/components/ui/button";
import { AvatarImage, AvatarFallback, Avatar } from "@web/components/ui/avatar"
import { Input } from "@web/components/ui/input"
import { Gamepad2, Loader2, Settings, Swords } from "lucide-react";
import { ScrollArea } from "@web/components/ui/scroll-area"
import { cn } from "@web/utils/utils";
import SettingsButtonAlertDialog from "./_components/settings-button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@web/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@web/components/ui/tooltip";
import Link from "next/link";
import useSWR from "swr";
import { fetcher, swrFetcher } from "@web/utils/fetcher";
import React from "react";
import { useRouter } from 'next/navigation'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@web/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { toast } from "sonner";

const formSchema = z.object({
	content: z.string(),
})

export default function Chat({ params }: { params: { slug: string[] } }) {
	const router = useRouter()

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			content: "",
		},
	})

	const [loading, setLoading] = React.useState(false)
	async function onSubmit(values: z.infer<typeof formSchema>) {
		setLoading(true)
		// Do something with the form values.
		// ✅ This will be type-safe and validated.

		if (values.content.length < 1) {
			setLoading(false);
			return;
		}
		// sleep for 4 seconds
		const data = await fetcher(`/chat/send`, "POST", {
			id: parseInt(chatID) || "",
			content: values.content,
		});
		setLoading(false);
		if (data.status != 200) {
			form.setError("content", {
				message: data.json.error,
			})
			return;
		} else {
			toast.success("Message sent.");
			form.reset();
			const elem = (document.getElementById("scrollArea") as HTMLDivElement);
			elem.scrollTo(0, elem.scrollHeight);
			mutate();
		}
	}

	const [chatID, setChatID] = React.useState(params.slug[0] || "")
	const [password, setPassword] = React.useState(params.slug[1] || "")


	const { data, error, isLoading, mutate } = useSWR(`/chat/${chatID}/${password}`, swrFetcher, { refreshInterval: 1000 })
	if (chatID === "") return <div>Invalid Chat ID</div>
	if (isLoading) return <div className="animate-pulse">Loading...</div>
	if (error || !data.id) return <div>{data.error ? data.error : "Error"}</div>

	return (
		<div className="flex">
			<section className="flex flex-col w-full">
				<header className="absolute top-0 p-[6px]">
					<div className="flex">
						<h2 className="text-xl font-bold flex items-center gap-2">
							{data && data.users.map((user: any, index: number) => {
								if (index >= 3) return null
								return (
									<Avatar className={cn("relative w-10 h-10 pointer-events-none", index > 0 && "-ml-4")} key={user.id + index}>
										<AvatarImage className="rounded-full" alt="User Avatar" src={user.pfp} />
										<AvatarFallback>U</AvatarFallback>
									</Avatar>
								)
							})}
							{data && data.users.length > 3 && (
								<div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 -ml-4">
									+{data.users.length - 3}
								</div>
							)}
							<div>
								{data && data.users.length && data.users.map((user: any, index: number) => {
									if (index >= 3) return null
									return (
										<span key={user.username + index}>
											{index > 0 && ", "}
											{user.username}
											{index == 2 && data.users.length > 3 && "..."}
										</span>
									)
								})}
								<span className="text-xs text-muted-foreground block">{data ? data.type : "?"}</span>
							</div>
						</h2>
						<SettingsButtonAlertDialog />
					</div>
				</header>
				<div className="flex-1 overflow-hidden max-h-screen">
					<ScrollArea className="pt-2 border-t dark:border-zinc-700 rounded h-96" id="scrollArea">
						{data && data.messages.map((message: any, index: number) =>
							message.author.isFromUser ?
								(
									<div className="flex items-end gap-2 py-2" key={`${message.id} + ${message.username}`} id={index === data.messages.length - 1 ? "lastMsg" : ""}>
										<Avatar className="relative overflow-visible w-10 h-10">
											<AvatarImage alt="User Avatar" src={message.author.pfp} className="rounded-full" />
											<AvatarFallback>U</AvatarFallback>
										</Avatar>
										<div className="rounded-lg bg-blue-500 text-white p-2 mr-3">
											<p className="font-extrabold text-left">You</p>
											<p className="text-sm text-justify">{message.content}</p>
										</div>
									</div>
								)
								: (
									<DropdownMenu key={message.id + message.content}>
										<DropdownMenuTrigger className="hover:opacity-70 flex items-end gap-2 justify-start py-2">
											<Avatar className="relative overflow-visible w-10 h-10">
												<AvatarImage alt="User Avatar" src={message.author.pfp} className="rounded-full" />
												<AvatarFallback>U</AvatarFallback>
											</Avatar>
											<div className="rounded-lg bg-zinc-200 dark:bg-zinc-700 p-2 mr-3">
												<p className="font-extrabold text-left">{message.author.username}</p>
												<p className="text-sm text-justify">{message.content}</p>
											</div>
										</DropdownMenuTrigger>
										<DropdownMenuContent align="end">
											<Link href={`/profile/${message.author.id}`}>
												<DropdownMenuItem>
													View Profile
												</DropdownMenuItem>
											</Link>
											<DropdownMenuItem>
												Block
											</DropdownMenuItem>
											<DropdownMenuItem>
												Mute 10min
											</DropdownMenuItem>
											<DropdownMenuItem>
												Kick
											</DropdownMenuItem>
											<DropdownMenuItem>
												Ban
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								)
						)}
					</ScrollArea>
					<div className="bottom-0 p-4 border-t dark:border-zinc-700">
						<Form {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center gap-2">
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger asChild>
											<Button size="sm" variant="ghost" className="hover:bg-gray-700">
												<Gamepad2 className="w-6 h-6" />
											</Button>
										</TooltipTrigger>
										<TooltipContent>
											<p>Start Game</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
								<FormField
									control={form.control}
									name="content"
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Input className="flex-1" type="text" placeholder="Type a message..." {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<Button type="submit" disabled={loading || form.getValues().content == ""}>
									{loading ? <Loader2 className="animate-spin" /> : "Submit"}
								</Button>
							</form>
						</Form>
					</div>
				</div>
			</section>
		</div>
	);
}
