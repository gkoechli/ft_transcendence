"use client";

import { Separator } from "@web/components/ui/separator";
import { FriendCard } from "./_components/friend";
import { FriendRequestCard } from "./_components/friend-request";

export default function Home() {
	const friendList = [
		{
			name: "John Doe",
			online: true,
			status: "Playing Game",
			pfp: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
		},
		{
			name: "Jack smith",
			online: false,
			status: "Sleeping in bed",
			pfp: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
		},
		{
			name: "John Smith",
			online: true,
			status: "Eating a sandwich",
			pfp: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
		},
		{
			name: "Jane Smith",
			online: false,
			status: "Making a sandwich",
			pfp: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
		}
	];

	const friendRequests = [
		{
			name: "John Doe",
			online: true,
			status: "Playing Game",
			pfp: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
		},
		{
			name: "Jack smith",
			online: false,
			status: "Sleeping in bed",
			pfp: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
		},
	];

	return (
		<div className="-mt-4">
			{friendRequests
				&& (
					<div>
						<h4 className="text-xl font-bold flex items-center">
							Friend Requests
							<span
								className="ml-3 inline-block rounded-full py-0.5 px-3 text-xs font-bold bg-blue-600 text-white"
							>
								10
							</span>
						</h4>
						{friendRequests.map((friend, idx) => (
							<FriendRequestCard key={friend.name + "_" + idx} name={friend.name} online={friend.online} status={friend.status} avatar={friend.pfp} />
						))}
						<Separator className="my-8 bg-white" />
					</div>
				)
			}
			<div>
				<h4 className="text-xl font-bold">
					Friends
				</h4>
				{friendList
					? friendList.map((friend, idx) => (
						<FriendCard key={friend.name + "_" + idx} name={friend.name} online={friend.online} status={friend.status} avatar={friend.pfp} />
					))
					: <p>no friends</p>}
			</div>

		</div>
	);
}
