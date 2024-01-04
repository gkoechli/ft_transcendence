"use client";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@web/components/ui/alert-dialog"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@web/components/ui/form"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@web/components/ui/select"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { MultiSelect, MultiSelectItem } from "@tremor/react";
import { Button } from "@web/components/ui/button";
import { Loader2, Settings } from "lucide-react";
import { useState } from "react";
import { Input } from "@web/components/ui/input";
import { toast } from "sonner";
import { cn } from "@web/utils/utils";

const formSchema = z.object({
	type: z.enum(["public", "protected", "private"]),
	password: z.string().optional(),
	users: z.array(z.string().regex(/^[0-9]+$/)).min(1, { message: "Please select at least one friend." }),
	admins: z.array(z.string().regex(/^[0-9]+$/)),
	owner: z.string().regex(/^[0-9]+$/),
}).superRefine((schema, ctx) => {
	const { type, password, users } = schema;
	if (type === "protected" && password?.length == 0) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: `Password must be set for Protected chat.`,
			path: ["password"],
		})
	}
})

export default function SettingsButtonAlertDialog() {
	const friends = [
		{ id: "1", name: "John" },
		{ id: "2", name: "Patrick" },
		{ id: "3", name: "Jack" },
	]

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			type: "public",
			password: "",
			users: ["1", "2", "3"],
			admins: ["2"],
			owner: "1"
		},
	})

	const [loading, setLoading] = useState(false)
	function onSubmit(values: z.infer<typeof formSchema>) {
		setLoading(true)
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values)

		// sleep for 4 seconds
		setTimeout(() => {
			setLoading(false)
			setOpen(false)
		}, 4000)
	}

	const [open, setOpen] = useState(false)
	return (
		<AlertDialog open={open}>
			<AlertDialogTrigger asChild>
				<Button size="sm" variant="ghost" className="hover:bg-gray-700" onClick={() => setOpen(true)}>
					<Settings className="h-6 w-6" />
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent className="bg-gray-950">
				<AlertDialogHeader>
					<AlertDialogTitle>New Chat</AlertDialogTitle>
					<AlertDialogDescription>
						You can create a new chat by selecting options below.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<FormField
							control={form.control}
							name="type"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Type</FormLabel>
									<FormControl>
										<Select onValueChange={field.onChange} defaultValue={field.value}>
											<SelectTrigger>
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="public">Public</SelectItem>
												<SelectItem value="private">Private</SelectItem>
												<SelectItem value="protected">Protected</SelectItem>
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input type="text" placeholder="password" disabled={form.getValues().type != "protected"} defaultValue={field.value} {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="users"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Friends</FormLabel>
									<FormControl>
										<MultiSelect onValueChange={field.onChange} defaultValue={field.value}>
											{friends && friends.map((friend) =>
												<MultiSelectItem value={friend.id} key={`${friend.id}${friend.name}`}>{friend.name}</MultiSelectItem>
											)}
										</MultiSelect>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="admins"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Admins</FormLabel>
									<FormControl>
										<MultiSelect onValueChange={field.onChange} defaultValue={field.value}>
											{friends && friends.map((friend) =>
												<MultiSelectItem value={friend.id} key={`${friend.id}${friend.name}`}>{friend.name}</MultiSelectItem>
											)}
										</MultiSelect>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="owner"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Owner</FormLabel>
									<FormControl>
										<Select onValueChange={field.onChange} defaultValue={field.value}>
											<SelectTrigger>
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												{friends && friends.map((friend) =>
													<SelectItem value={friend.id} key={`${friend.id}${friend.name}`}>{friend.name}</SelectItem>
												)}
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<AlertDialogFooter>
							<Button type="button" disabled={loading} className={cn(form.getValues().type != "public" && "hidden")} onClick={async (event) => {
								event.preventDefault()
								try {
									navigator.clipboard.writeText(window.location.href).then(() => toast.success("Copied to clipboard!"))
								} catch (err) {
									toast.error("Failed to copy to clipboard")
								}
							}}>
								{loading ? <Loader2 className="animate-spin" /> : "Share"}
							</Button>
							<Button type="button" className="bg-red-500" disabled={loading}>
								{loading ? <Loader2 className="animate-spin" /> : "Leave"}
							</Button>
							<AlertDialogCancel onClick={() => setOpen(false)}>Cancel</AlertDialogCancel>
							<Button type="submit" disabled={loading}>
								{loading ? <Loader2 className="animate-spin" /> : "Save"}
							</Button>
						</AlertDialogFooter>
					</form>
				</Form>
			</AlertDialogContent>
		</AlertDialog>
	)
}