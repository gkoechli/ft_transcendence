"use client";

import { Card } from "@web/components/card/card";
import { Badge } from "@web/components/ui/badge";
import { Button } from "@web/components/ui/button";
import { ArrowUpRight, Eye, MessageSquare, MoreHorizontal, Swords } from "lucide-react";
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
import { toast } from "sonner";
import { fetcher } from "@web/utils/fetcher";

export function FriendCard({ id, name, avatar, online, inGame }: {
	id: number,
	name: string;
	avatar: string;
	online: boolean;
	inGame: boolean;
}) {
	return (
		<Card>
			<div className="p-6 flex items-center w-full justify-between hover:bg-gray-800">
				<Link className="flex" href={`/profile/${id}`}>
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
							<p className="flex">
								{name}
								<ArrowUpRight width={12} height={12} />
							</p>
							<Badge variant={`${online ? "default" : "destructive"}`}>
								{online ? "Online" : "Offline"}
							</Badge>
						</div>
					</div>
				</Link>
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
							<DropdownMenuItem onClick={async (e) => {
								e.preventDefault();
								const res = await fetcher(`/friend/remove`, "POST", { id: id });
								if (res.status === 200 || res.status === 208) {
									toast.success(res.json.msg);
									return
								} else if (res.status === 400) {
									toast.error(res.json.error);
									return
								}
								toast.error("An unknown error occurred");
							}}>
								Remove friend
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</Card>
	)
}