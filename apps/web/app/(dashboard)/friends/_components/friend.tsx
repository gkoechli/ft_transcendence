"use client";

import { Card } from "@web/components/card/card";
import { Badge } from "@web/components/ui/badge";
import { Button } from "@web/components/ui/button";
import { Eye, MessageSquare, MoreHorizontal, Swords } from "lucide-react";
import Image from "next/image";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@web/components/ui/tooltip"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@web/components/ui/dropdown-menu"
import Link from "next/link";

export function FriendCard({ name, avatar, online, inGame }: {
	name: string;
	avatar: string;
	online: boolean;
	inGame: boolean;
}) {
	return (
		<Card>
			<Link href={`/profile/${name}`}>
				<div className="p-6 flex items-center w-full justify-between hover:bg-gray-800">
					<div className="flex">
						<div>
							<Image
								src={avatar}
								width={48}
								height={48}
								className="rounded-full w-12 h-12"
								alt="avatar"
								loading="eager"
							/>
						</div>
						<div className="ml-4">
							<div className="items-center">
								<p>
									{name}
								</p>
								<Badge variant={`${online ? "default" : "destructive"}`}>
									{online ? "Online" : "Offline"}
								</Badge>
							</div>
						</div>
					</div>
					<div>
						<p className="text-sm text-gray-100">
							{inGame ? "In Game" : "Not playing"}
						</p>
					</div>
					<div className="flex float-right">
						{inGame ?
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger asChild>
										<Button size="sm" variant="ghost" className="hover:bg-gray-700">
											<Eye className="h-4 w-4" />
										</Button>
									</TooltipTrigger>
									<TooltipContent>
										<p>View Game</p>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
							:
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger asChild>
										<Button size="sm" variant="ghost" className="hover:bg-gray-700">
											<Swords className="h-4 w-4" />
										</Button>
									</TooltipTrigger>
									<TooltipContent>
										<p>Start Game</p>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						}
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<Button size="sm" variant="ghost" className="hover:bg-gray-700">
										<MessageSquare className="h-4 w-4" />
									</Button>
								</TooltipTrigger>
								<TooltipContent>
									<p>Open Chat</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" size="sm" className="hover:bg-gray-700 h-9 w-10">
									<MoreHorizontal className="h-4 w-4" />
									<span className="sr-only">More</span>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuItem>
									Block friend
								</DropdownMenuItem>
								<DropdownMenuItem>
									Remove friend
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
			</Link>
		</Card>
	)
}