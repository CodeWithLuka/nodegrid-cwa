"use client";

import { useSuspenseWorkflow } from "@/features/workflows/hooks/use-suspense-workflow";

interface WorkflowEditorViewProps {
  workflowId: string;
}

export const WorkflowEditorView = ({ workflowId }: WorkflowEditorViewProps) => {
  const { data: workflow } = useSuspenseWorkflow(workflowId);

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1> Think, WorkflowEditorView: {workflowId}</h1>
    </div>
  );
};
