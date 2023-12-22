import { DashboardConfig } from "@web/types/types";
import { LayoutDashboard, MessagesSquare, Users } from "lucide-react";

export const dashboardConfig: DashboardConfig = [
	{
		title: "Dashboard",
		href: "/dashboard",
		icon: LayoutDashboard,
	},
	{
		title: "Friends",
		href: "/friends",
		icon: Users,
	},
	{
		title: "Chat",
		href: "/chat",
		icon: MessagesSquare,
	},
]
