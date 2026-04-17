import { toast } from "sonner";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";

/**
 * Hook to update a workflow name
 */
export const useUpdateWorkflowName = () => {
  const queryClient = useQueryClient();
  const trpc = useTRPC();

  return useMutation(
    trpc.workflows.updateName.mutationOptions({
      onMutate: () => {
        toast.loading("Updating workflow name.");
      },
      onSuccess: (data) => {
        const workflowId = data.id;
        const workflowName = data.name;

        toast.dismiss();
        toast.success(`Workflow "${workflowName}" updated`);
        queryClient.invalidateQueries(trpc.workflows.getMany.queryOptions({}));
        queryClient.invalidateQueries(
          trpc.workflows.getOne.queryOptions({ id: workflowId }),
        );
      },
      onError: (error) => {
        toast.dismiss();
        toast.error(`Failed to update workflow: ${error.message}`);
      },
    }),
  );
};
