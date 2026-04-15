import { requireAuth } from "@/features/auth/lib/auth-utils";

interface ExecutionIdPageProps {
  params: Promise<{
    executionId: string;
  }>;
}

const ExecutionIdPage = async ({ params }: ExecutionIdPageProps) => {
  await requireAuth();
  const { executionId } = await params;

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1> Think, ExecutionId: {executionId}</h1>
    </div>
  );
};

export default ExecutionIdPage;
