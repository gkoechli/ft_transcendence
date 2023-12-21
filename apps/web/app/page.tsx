import { Button } from "@web/components/ui/button";
import { trpc } from "../utils/trpc";

export default async function Home() {
  const response = await trpc.hello.query({});
  return (
    <div>
      <p>Server side - {response}</p>
    </div>
  );
}
