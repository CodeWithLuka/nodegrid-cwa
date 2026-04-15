import { requireAuth } from "@/features/auth/lib/auth-utils";

interface WorkflowIdPageProps {
  params: Promise<{
    workflowId: string;
  }>;
}

const WorkflowIdPage = async ({ params }: WorkflowIdPageProps) => {
  await requireAuth();
  const { workflowId } = await params;

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1> Think, WorkflowId: {workflowId}</h1>
    </div>
  );
};

export default WorkflowIdPage;
