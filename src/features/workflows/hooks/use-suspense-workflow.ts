/**
 * Hook to fetch all workflows using suspense
 */

import { useTRPC } from "@/trpc/client";

import { useSuspenseQuery } from "@tanstack/react-query";

export const useSuspenseWorkflow = (id: string) => {
  const trpc = useTRPC();
  const workflow = useSuspenseQuery(trpc.workflows.getOne.queryOptions({ id }));

  return workflow;
};
