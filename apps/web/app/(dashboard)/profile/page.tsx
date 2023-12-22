import { Button } from "@web/components/ui/button";
import Image from "next/image";
import { UsernameCard } from "./_components/username-card";
import { Card } from "./_components/card";
import { FACard } from "./_components/2FA-card";

export default function Home() {
	return (
		<>
			<Card>
				<div className="p-6">
					<div className="flex float-right">
						<button>
							<Image
								src={"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"}
								width={80}
								height={80}
								className="rounded-full hover:opacity-90"
								alt="avatar"
								loading="eager"
							/>
						</button>
					</div>
					<h4 className="text-2xl font-semibold text-white">Avatar</h4>
					<p className="my-3 dark:text-gray-300">
						This is your avatar.
						<br />
						Click on the avatar to upload a custom one from your files.
					</p>
				</div>
			</Card>

			<UsernameCard />

			<FACard />

			<Card>
				<div className="p-6">
					<h4 className="text-2xl font-semibold text-white">Preview</h4>
					<p className="my-3 dark:text-gray-300">
						Click below to view your public profile.
					</p>
				</div>
				<footer className="min-h-[57px] border-t-[1px] border-gray-700 py-3 px-6">
					<div className="flex items-center">
						<div className="m-auto mr-0">
							<Button size="sm" className="h-8 font-medium" type="submit">
								Preview
							</Button>
						</div>
					</div>
				</footer>
			</Card>
		</>
	);
}
