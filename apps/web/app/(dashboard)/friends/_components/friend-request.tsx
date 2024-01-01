"use client";

import { Card } from "@web/components/card/card";
import { Badge } from "@web/components/ui/badge";
import { Button } from "@web/components/ui/button";
import { Check, X } from "lucide-react";
import Image from "next/image";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@web/components/ui/tooltip"
import Link from "next/link";

export function FriendRequestCard({ name, avatar, online, inGame }: {
	name: string;
	avatar: string;
	online: boolean;
	inGame: boolean;
}) {
	return (
		<Card>
			<Link href={`/u/${name}`}>
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
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<Button size="sm" variant="ghost" className="hover:bg-green-500">
										<Check className="h-4 w-4" />
									</Button>
								</TooltipTrigger>
								<TooltipContent>
									<p>Accept</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>

						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<Button size="sm" variant="ghost" className="hover:bg-red-500">
										<X className="h-4 w-4" />
									</Button>
								</TooltipTrigger>
								<TooltipContent>
									<p>Refuse</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</div>
				</div>
			</Link>
		</Card>
	)
}