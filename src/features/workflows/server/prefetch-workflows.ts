import type { inferInput } from "@trpc/tanstack-react-query";
import { prefetch, trpc } from "@/trpc/server";

type workflowsInput = inferInput<typeof trpc.workflows.getMany>;
type workflowInput = inferInput<typeof trpc.workflows.getOne>;

/**
 * Prefetch all workflows
 */
export const prefetchWorkflows = (params: workflowsInput) => {
  return prefetch(trpc.workflows.getMany.queryOptions(params));
};

/**
 * Prefetch a single workflow
 */
export const prefetchWorkflow = (params: workflowInput) => {
  return prefetch(trpc.workflows.getOne.queryOptions(params));
};
