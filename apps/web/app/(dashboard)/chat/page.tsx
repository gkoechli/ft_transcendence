import { Button } from "@web/components/ui/button";
import Chats from "./_components/chats";
import { PlusSquare } from "lucide-react";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@web/components/ui/drawer"

export default function Home() {
	return (
		<>
			<div className="flex float-right">
				<Drawer>
					<DrawerTrigger asChild>
						<Button size="sm" variant="ghost" className="hover:bg-gray-700">
							<PlusSquare className="h-6 w-6" />
						</Button>
					</DrawerTrigger>
					<DrawerContent className="h-5/6">
						<DrawerHeader>
							<DrawerTitle>Are you sure absolutely sure?</DrawerTitle>
							<DrawerDescription>This action cannot be undone.</DrawerDescription>
						</DrawerHeader>
						<DrawerFooter>
							<Button>Submit</Button>
							<DrawerClose>
								<Button variant="outline">Cancel</Button>
							</DrawerClose>
						</DrawerFooter>
					</DrawerContent>
				</Drawer>
			</div>
			<Chats />
		</>
	);
}
