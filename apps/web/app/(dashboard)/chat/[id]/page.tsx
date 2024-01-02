import { Button } from "@web/components/ui/button";
import { AvatarImage, AvatarFallback, Avatar } from "@web/components/ui/avatar"
import { Input } from "@web/components/ui/input"
import { Gamepad2, Settings } from "lucide-react";
import { ScrollArea } from "@web/components/ui/scroll-area"
import { cn } from "@web/utils/utils";

export default function Chat() {
	const chat = {
		id: "728ed52f",
		pfp: ["https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80", "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80", "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80", "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"],
		usernames: ["John Doe", "Jack Doe", "Jane Doe", "Jill Doe"],
		lastMessage: "Hello everyone this is a sick new chat app!",
		newMessages: 10,
		type: "private"
	}

	const messages = [
		{
			id: 1,
			isFromUser: false,
			username: "John Doe",
			avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
			content: "Hello, how are you?",
		},
		{
			id: 2,
			isFromUser: true,
			username: "",
			avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
			content: "Hello, how are you?",
		},
		{
			id: 1,
			isFromUser: false,
			username: "John Doe",
			avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
			content: "Hello, how are you?",
		},
		{
			id: 2,
			isFromUser: true,
			username: "",
			avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
			content: "Hello, how are you?",
		},
		{
			id: 1,
			isFromUser: false,
			username: "John Doe",
			avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
			content: "Hello, how are you?",
		},
		{
			id: 2,
			isFromUser: true,
			username: "",
			avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
			content: "Hello, how are you?",
		},
		{
			id: 1,
			isFromUser: false,
			username: "John Doe",
			avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
			content: "Hello, how are you?",
		},
		{
			id: 2,
			isFromUser: true,
			username: "",
			avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
			content: "Hello, how are you?",
		},
		{
			id: 1,
			isFromUser: false,
			username: "John Doe",
			avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
			content: "Hello, how are you?",
		},
		{
			id: 2,
			isFromUser: true,
			username: "",
			avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
			content: "Hello, how are you?",
		},
		{
			id: 1,
			isFromUser: false,
			username: "John Doe",
			avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
			content: "Hello, how are you?",
		},
		{
			id: 2,
			isFromUser: true,
			username: "",
			avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
			content: "Hello, how are you?",
		},
		{
			id: 1,
			isFromUser: false,
			username: "John Doe",
			avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
			content: "Hello, how are you?",
		},
		{
			id: 2,
			isFromUser: true,
			username: "",
			avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
			content: "Hello, how are you?",
		},
		{
			id: 1,
			isFromUser: false,
			username: "John Doe",
			avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
			content: "Hello, how are you?",
		},
		{
			id: 2,
			isFromUser: true,
			username: "",
			avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
			content: "Hello, how are you?",
		},
		{
			id: 1,
			isFromUser: false,
			username: "John Doe",
			avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
			content: "Hello, how are you?",
		},
		{
			id: 2,
			isFromUser: true,
			username: "",
			avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
			content: "Hello, how are you?",
		},
		{
			id: 1,
			isFromUser: false,
			username: "John Doe",
			avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
			content: "Hello, how are you?",
		},
		{
			id: 2,
			isFromUser: true,
			username: "",
			avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
			content: "Hello, how are you?",
		},
		{
			id: 1,
			isFromUser: false,
			username: "John Doe",
			avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
			content: "Hello, how are you?",
		},
		{
			id: 2,
			isFromUser: true,
			username: "",
			avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
			content: "Hello, how are you?",
		},
		{
			id: 1,
			isFromUser: false,
			username: "John Doe",
			avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
			content: "Hello, how are you?",
		},
		{
			id: 2,
			isFromUser: true,
			username: "",
			avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
			content: "Hello, how are you?",
		},
		{
			id: 1,
			isFromUser: false,
			username: "John Doe",
			avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
			content: "Hello, how are you?",
		},
		{
			id: 2,
			isFromUser: true,
			username: "",
			avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
			content: "Hello, how are you?",
		},
		{
			id: 1,
			isFromUser: false,
			username: "John Doe",
			avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
			content: "Hello, how are you?",
		},
		{
			id: 2,
			isFromUser: true,
			username: "",
			avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
			content: "Hello, how are you?",
		},
		{
			id: 1,
			isFromUser: false,
			username: "John Doe",
			avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
			content: "Hello, how are you?",
		},
		{
			id: 2,
			isFromUser: true,
			username: "",
			avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
			content: "Hello, how are you?",
		},
		{
			id: 1,
			isFromUser: false,
			username: "John Doe",
			avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
			content: "Hello, how are you?",
		},
		{
			id: 2,
			isFromUser: true,
			username: "",
			avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
			content: "Hello, how are you?",
		},
		{
			id: 1,
			isFromUser: false,
			username: "John Doe",
			avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
			content: "Hello, how are you?",
		},
		{
			id: 2,
			isFromUser: true,
			username: "",
			avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
			content: "Hello, how are you?",
		},
	]

	return (
		<div className="flex">
			<section className="flex flex-col w-full">
				<header className="absolute top-0 p-[6px]">
					<div className="flex">
						<h2 className="text-xl font-bold flex items-center gap-2">
							{chat && chat.pfp.map((pfp, index) => {
								if (index >= 3) return null
								return (
									<Avatar className={cn("relative w-10 h-10 pointer-events-none", index > 0 && "-ml-4")} key={pfp + index}>
										<AvatarImage className="rounded-full" alt="User Avatar" src={pfp} />
										<AvatarFallback>U</AvatarFallback>
									</Avatar>
								)
							})}
							{chat && chat.pfp.length > 3 && (
								<div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 -ml-4">
									+{chat.pfp.length - 3}
								</div>
							)}
							<div>
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
								<span className="text-xs text-muted-foreground block">{chat.type}</span>
							</div>
						</h2>
						<Button size="sm" variant="ghost" className="hover:bg-gray-700">
							<Settings className="h-6 w-6" />
						</Button>
					</div>
				</header>
				<main className="flex-1 overflow-auto">
					<ScrollArea className="space-y-4 h-[75vh]">
						{messages.map((message) => {
							if (message.isFromUser)
								return (
									<div className="flex items-end gap-2 justify-end" key={`${message.id}+${message.username}`}>
										<div className="rounded-lg bg-blue-500 text-white p-2 mr-3">
											<p className="text-sm">{message.content}</p>
										</div>
									</div>
								)
							return (
								<div className="flex items-end gap-2" key={`${message.id}+${message.username}`}>
									<Avatar className="relative overflow-visible w-10 h-10">
										<AvatarImage alt="User Avatar" src={message.avatar} className="rounded-full" />
										<AvatarFallback>{message.username[0].toLocaleUpperCase()}</AvatarFallback>
									</Avatar>
									<div className="rounded-lg bg-zinc-200 dark:bg-zinc-700 p-2">
										<p className="text-sm">{message.content}</p>
									</div>
								</div>
							)
						})}
					</ScrollArea>
				</main>
				<footer className="w-full">
					<div className="bottom-0 p-4 border-t dark:border-zinc-700">
						<div className="flex items-center gap-2">
							<Button size="icon" variant="ghost">
								<Gamepad2 className="w-6 h-6" />
							</Button>
							<Input className="flex-1" placeholder="Type a message..." />
							<Button>Send</Button>
						</div>
					</div>
				</footer>
			</section>
		</div>
	);
}
