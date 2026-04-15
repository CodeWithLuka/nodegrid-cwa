/**
 * Hook to fetch all workflows using suspense
 */

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export const useSuspenseWorkflows = () => {
  const trpc = useTRPC();
  const workflows = useSuspenseQuery(trpc.workflows.getMany.queryOptions());

  return workflows;
};
