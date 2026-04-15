import { requireAuth } from "@/features/auth/lib/auth-utils";

const ExecutionsPage = async () => {
  await requireAuth();

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1> Think, Executions</h1>
    </div>
  );
};

export default ExecutionsPage;
