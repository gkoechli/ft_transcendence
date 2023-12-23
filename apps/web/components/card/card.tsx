export function Card({ children }: {
	children: React.ReactNode
}) {
	return (
		<section className="mb-8 max-w-5xl">
			<div className="bg-gray-800/50 rounded-md shadow overflow-hidden border-[1px] border-gray-700">
				{children}
			</div>
		</section>
	)
}