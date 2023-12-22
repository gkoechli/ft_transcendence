export type NavItem = {
	title: string
	href: string
	disabled?: boolean
}

export type MainNavItem = NavItem

export type SidebarNavItem = {
	title: string
	disabled?: boolean
	external?: boolean
	icon?: any
	href?: string
}

export type DashboardConfig = SidebarNavItem[]
