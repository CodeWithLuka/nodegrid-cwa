/**
 * Hook to fetch all workflows using suspense
 */

import { useSuspenseQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";

import { useWorkflowsParams } from "./use-workflows-params";

export const useSuspenseWorkflows = () => {
  const trpc = useTRPC();
  const [params] = useWorkflowsParams();
  const workflows = useSuspenseQuery(
    trpc.workflows.getMany.queryOptions(params),
  );

  return workflows;
};
