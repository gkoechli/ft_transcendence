"use client";

import { dashboardConfig } from "@web/config/dashboard"
import { cn } from "@web/utils/utils"
import Image from 'next/image';
import Link from "next/link";
import { usePathname } from "next/navigation"
import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect } from "react";
import useSWR from "swr";
import { swrFetcher } from "@web/utils/fetcher";

export function DashboardNav() {
	const path = usePathname()

	const { data: user, error, isLoading } = useSWR('/user/me', swrFetcher, { refreshInterval: 500 })

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (!token) {
			window.location.href = '/'
		}
	})

	if (!dashboardConfig?.length) {
		return null
	}
	return (
		<div className="flex h-screen w-64">
			<div className="flex w-64 flex-col">
				<div className="flex min-h-0 flex-1 flex-col border-r border-gray-700 fixed h-screen w-64">
					<div className="flex flex-1 flex-col overflow-y-auto pt-4 pb-4">
						<div className=" h-14">
							<Link href={`/dashboard`}>
								<div className="flex px-4">
									<Image
										src={"/logo/logo.png"}
										width={32}
										height={32}
										className="h-8 w-auto"
										alt="Pungy Logo"
									/>
									<h1 className="text-center text-4xl tracking-wide font-semibold">
										Pungy
									</h1>
								</div>
							</Link>
						</div>

						<nav className="mt-5 flex-1" aria-label="Sidebar">
							<div className="space-y-1 px-2">
								{dashboardConfig.map((item, index) => {
									return item.href && (
										<Link
											key={item.href + " " + index}
											href={item.href}
											className={cn(
												path === item.href
													? 'text-white'
													: 'text-gray-200',
												'group flex items-center px-2 py-2 text-sm font-medium rounded-md hover:bg-gray-700'
											)}
										>
											<item.icon
												className={cn(
													path === item.href ? 'text-white' : 'text-gray-400 group-hover:text-gray-100',
													'mr-3 h-6 w-6'
												)}
												aria-hidden="true"
											/>
											<span className={cn(
												"flex-1",
												path === item.href ? 'text-white font-bold' : 'text-gray-400 group-hover:text-gray-100'
											)}>{item.title}</span>
											{!isLoading && user && user.notifications && ((user.notifications.friendRequests > 0 && item.href.includes("/friends")) || (user.notifications.chats > 0 && item.href.includes("/chat"))) ? (
												<span
													className="ml-3 inline-block rounded-full py-0.5 px-3 text-xs font-bold bg-blue-600 text-white"
												>
													{
														item.href === "/friends" ? user.notifications.friendRequests : item.href === "/chat" ? user.notifications.chats : null
													}
												</span>
											) : null}
										</Link>
									)
								})}
							</div>
						</nav>
					</div>
					<div className="flex flex-shrink-0 border-t border-gray-700 p-4">
						<div className="block w-full flex-shrink-0">
							<div className="flex items-center justify-between">
								<div className="group flex">
									<div>
										<Image
											className="inline-block h-10 w-10 rounded-full"
											src={user?.pfp}
											alt="loading..."
											width={40}
											height={40}
										/>
									</div>
									<div className="ml-3 flex">
										<Link href={`/profile`}>
											<p className="text-sm font-medium">{isLoading || error ? "loading..." : user?.username}</p>
											<p className="text-xs font-medium dark:text-slate-400 dark:group-hover:text-gray-100 group-hover:text-gray-700">Edit profile</p>
										</Link>
									</div>
								</div>
								<div className="ml-2 flex shrink-0">
									<Button
										variant="ghost"
										type="button"
										className="font-medium rounded p-1 text-white hover:text-red-500 bg-transparent hover:bg-transparent"
										onClick={() => {
											localStorage.removeItem("token");
											window.location.href = "/"
										}}
									>
										<LogOut className="h-6 w-6 flex-shrink-0" aria-hidden="true" />
									</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
