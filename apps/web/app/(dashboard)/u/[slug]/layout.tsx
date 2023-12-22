export default async function Layout({
	children,
	params,
}: {
	children: React.ReactNode
	params: {
		slug: string
	}
}) {
	return (
		<>
			<h1>
				Layout slug: {params.slug}
			</h1>
			{children}
		</>
	)
}