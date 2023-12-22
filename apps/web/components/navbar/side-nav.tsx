"use client";

import { dashboardConfig } from "@web/config/dashboard"
import { cn } from "@web/utils/utils"
import Image from 'next/image';
import Link from "next/link";
import { usePathname } from "next/navigation"
import { LogOut } from "lucide-react";

export function DashboardNav(props: { friendsNotifications: number, chatNotifications: number }) {
	const path = usePathname()

	if (!dashboardConfig?.length) {
		return null
	}
	return (
		<div className="flex min-h-screen">
			<div className="flex w-64 flex-col">
				<div className="flex min-h-0 flex-1 flex-col border-r border-gray-700">
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
											{(props.friendsNotifications > 0 && item.href === "/friends") || ( props.chatNotifications > 0 && item.href === "/chat") ? (
												<span
													className="ml-3 inline-block rounded-full py-0.5 px-3 text-xs font-bold bg-blue-600 text-white"
												>
													{
														item.href === "/friends" ? props.friendsNotifications : item.href === "/chat" ? props.chatNotifications : null
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
											src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
											alt=""
											width={40}
											height={40}
										/>
									</div>
									<div className="ml-3 flex">
										<Link href={`/profile`}>
											<p className="text-sm font-medium">Tom cook</p>
											<p className="text-xs font-medium dark:text-slate-400 dark:group-hover:text-gray-600 group-hover:text-gray-700">Edit profile</p>
										</Link>
									</div>
								</div>
								<div className="ml-2 flex shrink-0">
									<Link
										href={`/api/logout`}
										type="button"
										className="font-medium rounded p-1 text-white hover:text-red-800">
										<LogOut className="h-6 w-6 flex-shrink-0" aria-hidden="true" />
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
