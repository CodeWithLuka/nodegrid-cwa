import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { HydrateClient } from "@/trpc/server";

import { requireAuth } from "@/features/auth/lib/auth-utils";

import { prefetchWorkflows } from "@/features/workflows/server/prefetch-workflows";
import { WorkflowsView } from "@/features/workflows/ui/views/workflows-view";
import { WorkflowsContainer } from "@/features/workflows/ui/components/workflows-container";

const WorkflowsPage = async () => {
  await requireAuth();
  prefetchWorkflows();

  return (
    <WorkflowsContainer>
      <HydrateClient>
        <ErrorBoundary fallback={<p>Error</p>}>
          <Suspense fallback={<p>Loading</p>}>
            <WorkflowsView />
          </Suspense>
        </ErrorBoundary>
      </HydrateClient>
    </WorkflowsContainer>
  );
};

export default WorkflowsPage;
