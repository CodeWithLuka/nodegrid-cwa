import { toast } from "sonner";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";

/**
 * Hook to remove a workflow
 */

export const useRemoveWorkflow = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const removedWorkflow = useMutation(
    trpc.workflows.remove.mutationOptions({
      onSuccess: (data) => {
        const workflowId = data.id;
        const workflowName = data.name;

        toast.success(`Workflow "${workflowName}" removed`);
        queryClient.invalidateQueries(trpc.workflows.getMany.queryOptions({}));
        queryClient.invalidateQueries(
          trpc.workflows.getOne.queryFilter({ id: workflowId }),
        );
      },
    }),
  );

  return removedWorkflow;
};
