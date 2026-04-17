import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { HydrateClient } from "@/trpc/server";
import { requireAuth } from "@/features/auth/lib/auth-utils";
import { prefetchWorkflow } from "@/features/workflows/server/prefetch-workflows";
import { WorkflowEditorView } from "@/features/editor/ui/views/workflow-editor-view";
import { WorkflowEditorHeader } from "@/features/editor/ui/components/workflow-editor-header";
import { WorkflowEditorErrorState } from "@/features/editor/ui/components/workflow-editor-error-state";
import { WorkflowEditorLoadingState } from "@/features/editor/ui/components/workflow-editor-loading-state";

interface WorkflowIdPageProps {
  params: Promise<{
    workflowId: string;
  }>;
}

const WorkflowIdPage = async ({ params }: WorkflowIdPageProps) => {
  const { workflowId } = await params;

  await requireAuth();
  await prefetchWorkflow(workflowId);

  return (
    <HydrateClient>
      <ErrorBoundary fallback={<WorkflowEditorErrorState />}>
        <Suspense fallback={<WorkflowEditorLoadingState />}>
          <div className="flex h-screen flex-col overflow-hidden">
            <WorkflowEditorHeader workflowId={workflowId} />
            <main className="min-h-0 flex-1">
              <WorkflowEditorView workflowId={workflowId} />
            </main>
          </div>
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  );
};

export default WorkflowIdPage;
