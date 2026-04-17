"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { useSuspenseWorkflow } from "@/features/workflows/hooks/use-suspense-workflow";

import { WorkflowEditorBreadcrumbs } from "./workflow-editor-breadcrumbs";
import { WorkflowEditorSaveButton } from "./workflow-editor-save-button";

interface WorkflowEditorHeaderProps {
  workflowId: string;
}

export const WorkflowEditorHeader = ({
  workflowId,
}: WorkflowEditorHeaderProps) => {
  const { data: workflow } = useSuspenseWorkflow(workflowId);
  const workflowName = workflow.name;

  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4 bg-background">
      <SidebarTrigger />
      <div className="flex flex-row items-center justify-between gap-x-4 w-full">
        <WorkflowEditorBreadcrumbs workflowId={workflowId} />
        <WorkflowEditorSaveButton workflowId={workflowId} />
      </div>
    </header>
  );
};
