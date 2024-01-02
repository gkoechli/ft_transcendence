import { Button } from "@web/components/ui/button"
import Image from "next/image"

import {
	Table,
	TableBody,
	TableCell,
	TableRow,
} from "@web/components/ui/table"
import { cn } from "@web/utils/utils"
import { MessageSquare } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@web/components/ui/tooltip"
import Link from "next/link"

export type Chat = {
	id: string
	pfp: string[]
	usernames: string[]
	lastMessage: string
	newMessages: number
}

function getData(): Chat[] {
	// Fetch data from your API here.
	return [
		{
			id: "728ed52f",
			pfp: ["https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80", "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80", "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80", "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"],
			usernames: ["John Doe", "Jack Doe", "Jane Doe", "Jill Doe"],
			lastMessage: "Hello everyone this is a sick new chat app!",
			newMessages: 10,
		},
		{
			id: "728ed52f",
			pfp: ["https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80", "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80", "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80", "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"],
			usernames: ["John Doe", "Jack Doe", "Jane Doe", "Jill Doe"],
			lastMessage: "Hello everyone this is a sick new chat app!",
			newMessages: 0,
		},
		{
			id: "728ed52f",
			pfp: ["https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"],
			usernames: ["John Doe"],
			lastMessage: "Hello everyone this is a sick new chat app!",
			newMessages: 3,
		}
		// ...
	]
}

export default function Chats() {
	const data = getData()

	return (
		<div className="container mx-auto overflow-scroll">
			<Table>
				<TableBody>
					{data?.length ?
						data.map((chat) => {
							return (
								<TableRow key={chat.id}>
									<TableCell key={chat.id + "cell"}>
										<div className="flex">
											{chat.pfp && chat.pfp.map((pfp, index) => {
												if (index >= 3) return null
												return (
													<Image
														key={pfp + index}
														src={pfp}
														className={cn("w-8 h-8 rounded-full pointer-events-none", index > 0 && "-ml-2")}
														width={32}
														height={32}
														alt="avatar"
													/>
												)
											})}
											{chat.pfp.length > 3 && (
												<div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 -ml-2">
													+{chat.pfp.length - 3}
												</div>
											)}
										</div>
									</TableCell>
									<TableCell key={chat.id + "cell"}>
										<div className="">
											<p className="font-bold text-foreground text-ellipsis">
												{chat.usernames.length && chat.usernames.map((username, index) => {
													if (index >= 3) return null
													return (
														<span key={username + index}>
															{index > 0 && ", "}
															{username}
															{index == 2 && "..."}
														</span>
													)
												})}
											</p>
											<p className="text-muted-foreground text-ellipsis">{chat.lastMessage}</p>
										</div>
									</TableCell>
									<TableCell key={chat.id + "cell"}>
										{chat.newMessages > 0 &&
											<span
												className="ml-3 inline-block rounded-full py-0.5 px-3 text-xs font-bold bg-blue-600 text-white"
											>
												{chat.newMessages}
											</span>
										}
									</TableCell>
									<TableCell key={chat.id + "cell"}>
										<TooltipProvider>
											<Tooltip>
												<TooltipTrigger asChild>
													<Link href={`/chat/${chat.id}`}>
														<Button size="sm" variant="ghost" className="hover:bg-gray-700">
															<MessageSquare className="h-4 w-4" />
														</Button>
													</Link>
												</TooltipTrigger>
												<TooltipContent>
													<p>Open Chat</p>
												</TooltipContent>
											</Tooltip>
										</TooltipProvider>

									</TableCell>
								</TableRow>
							)
						})
						: (
							<TableRow>
								<TableCell colSpan={Object.keys(data).length} className="h-24 text-center">
									No Chats.
								</TableCell>
							</TableRow>
						)}
				</TableBody>
			</Table>
		</div>
	)
}
