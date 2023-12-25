"use client";

import { Card } from "@web/components/card/card";
import { Badge } from "@web/components/ui/badge";
import { Button } from "@web/components/ui/button";
import { Eye, MoreHorizontal, Swords } from "lucide-react";
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

export function FriendCard({ name, avatar, online, status }: {
	name: string;
	avatar: string;
	online: boolean;
	status: string;
}) {
	return (
		<Card>
			<div className="p-6 flex items-center w-full justify-between">
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
						{status}
					</p>
				</div>
				<div className="flex float-right">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger>
								<Button size="sm" variant="ghost">
									<Eye className="h-4 w-4" />
								</Button>
							</TooltipTrigger>
							<TooltipContent>
								<p>View Game</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>

					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger>
								<Button size="sm" variant="ghost">
									<Swords className="h-4 w-4" />
								</Button>
							</TooltipTrigger>
							<TooltipContent>
								<p>Start Game</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>

					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger>
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button variant="ghost" size="icon">
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
							</TooltipTrigger>
							<TooltipContent>
								<p>More</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			</div>
		</Card>
	)
}