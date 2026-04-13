import { Button } from "@/components/ui/button";
import prisma from "@/db";

export default async function Home() {
  const users = await prisma.user.findMany();

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1 className="text-2xl"> Think, Different</h1>
      <Button>Apple</Button>
      <p>{JSON.stringify(users)}</p>
    </div>
  );
}
