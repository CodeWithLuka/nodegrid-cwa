import { requireAuth } from "@/features/auth/lib/auth-utils";

export default async function Home() {
  await requireAuth();

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1 className="text-2xl"> Think, Different</h1>
    </div>
  );
}
