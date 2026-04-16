import { Suspense } from "react";
import type { SearchParams } from "nuqs/server";
import { ErrorBoundary } from "react-error-boundary";

import { HydrateClient } from "@/trpc/server";

import { requireAuth } from "@/features/auth/lib/auth-utils";

import { WorkflowsView } from "@/features/workflows/ui/views/workflows-view";
import { workflowsParamsLoader } from "@/features/workflows/server/params-loader";
import { prefetchWorkflows } from "@/features/workflows/server/prefetch-workflows";
import { WorkflowsContainer } from "@/features/workflows/ui/components/workflows-container";
import { WorkflowsErrorState } from "@/features/workflows/ui/components/workflows-error-state";
import { WorkflowsLoadingState } from "@/features/workflows/ui/components/workflows-loading-state";

interface WorkflowsPageProps {
  searchParams: Promise<SearchParams>;
}

const WorkflowsPage = async ({ searchParams }: WorkflowsPageProps) => {
  await requireAuth();
  const params = await workflowsParamsLoader(searchParams);
  prefetchWorkflows(params);

  return (
    <WorkflowsContainer>
      <HydrateClient>
        <ErrorBoundary fallback={<WorkflowsErrorState />}>
          <Suspense fallback={<WorkflowsLoadingState />}>
            <WorkflowsView />
          </Suspense>
        </ErrorBoundary>
      </HydrateClient>
    </WorkflowsContainer>
  );
};

export default WorkflowsPage;
