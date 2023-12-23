import { FriendCard } from "./_components/friend";

export default function Home() {
	return (
		<div>
			<FriendCard name="oaarsse" status="Online" avatar="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
			<FriendCard name="mfaucheu" status="Offline" avatar="https://images.unsplash.com/photo-1703319958424-bfb960c17c52?q=80&w=2834&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
			<FriendCard name="gkoechli" status="Online" avatar="https://images.unsplash.com/photo-1682686580186-b55d2a91053c?q=80&w=2875&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
		</div>
	);
}
