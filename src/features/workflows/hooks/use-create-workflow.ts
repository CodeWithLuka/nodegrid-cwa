/**
 * Hook to create a workflow
 */

import { toast } from "sonner";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";

export const useCreateWorkflow = () => {
  const trpc = useTRPC();

  const queryClient = useQueryClient();

  const createdWorkflow = useMutation(
    trpc.workflows.create.mutationOptions({
      onMutate: () => {
        toast.loading("Creating Workflow. . .");
      },
      onSuccess: (data) => {
        const workflowId = data.id;
        const workflowName = data.name;

        toast.dismiss();
        toast.success(`Workflow ${workflowName} created.`);

        queryClient.invalidateQueries(trpc.workflows.getMany.queryOptions());
      },
      onError: (error) => {
        toast.dismiss();
        toast.error(`Failed to create workflow: ${error.message}`);
      },
    }),
  );

  return createdWorkflow;
};
