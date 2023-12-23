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
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@web/components/ui/popover"

export function FriendCard({ name, avatar, status }: {
	name: string;
	avatar: string;
	status: string;
}) {
	return (
		<Card>
			<div className="p-6 flex items-center w-full">
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
							<Badge variant="default">
								{status}
							</Badge>
						</div>
					</div>
				</div>
				<div className="flex float-right">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger>
								<Button size="sm" variant="ghost">
									<Eye />
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
									<Swords />
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
								<Popover>
									<PopoverTrigger>
										<Button size="sm" variant="ghost">
											<MoreHorizontal />
										</Button>
									</PopoverTrigger>
									<PopoverContent className="w-48 p-0">
										<Button size="sm"  variant="ghost" className="w-full">
											Block friend
										</Button>
										<Button size="sm" variant="ghost" className="w-full">
											Remove friend
										</Button>
									</PopoverContent>
								</Popover>
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