export default async function UserPage({
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
				Page slug: {params.slug}
			</h1>
		</>
	)
}