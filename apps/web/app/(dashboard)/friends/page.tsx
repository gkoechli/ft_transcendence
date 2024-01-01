"use client";

import { Separator } from "@web/components/ui/separator";
import { FriendCard } from "./_components/friend";
import { FriendRequestCard } from "./_components/friend-request";
import { PublicUser } from "@web/types/types";

export default function Home() {
	const friendList: PublicUser[] = [
		{
			id: "1",
			name: "John Doe",
			online: true,
			inGame: true,
			pfp: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
		},
		{
			id: "2",
			name: "Jack smith",
			online: false,
			inGame: false,
			pfp: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
		},
		{
			id: "3",
			name: "John Smith",
			online: true,
			inGame: false,
			pfp: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
		},
		{
			id: "4",
			name: "Jane Smith",
			online: false,
			inGame: false,
			pfp: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
		}
	];

	const friendRequests: PublicUser[] = [
		{
			id: "5",
			name: "John Doe",
			online: true,
			inGame: true,
			pfp: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
		},
		{
			id: "6",
			name: "Jack smith",
			online: false,
			inGame: false,
			pfp: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
		},
	];

	return (
		<div className="-mt-4">
			{friendRequests  && friendRequests.length > 0
				&& (
					<div>
						<h4 className="text-xl font-bold flex items-center">
							Friend Requests
							<span
								className="ml-3 inline-block rounded-full py-0.5 px-3 text-xs font-bold bg-blue-600 text-white"
							>
								{friendRequests.length}
							</span>
						</h4>
						{friendRequests.map((friend, idx) => (
							<FriendRequestCard key={friend.name + "_" + idx} name={friend.name} online={friend.online} inGame={friend.inGame} avatar={friend.pfp} />
						))}
						<Separator className="my-8 max-w-5xl bg-white" />
					</div>
				)
			}
			<div>
				<h4 className="text-xl font-bold">
					Friends
				</h4>
				{friendList && friendList.length > 0
					? friendList.map((friend, idx) => (
						<FriendCard key={friend.name + "_" + idx} name={friend.name} online={friend.online} inGame={friend.inGame} avatar={friend.pfp} />
					))
					: <div className="flex text-center justify-center">
						<p>No friends</p>
					</div> }
			</div>

		</div>
	);
}
