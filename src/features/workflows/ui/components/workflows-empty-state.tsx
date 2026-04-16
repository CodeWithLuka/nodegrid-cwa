"use client";

import { useRouter } from "next/navigation";

import { useUpgradeModal } from "@/features/subscriptions/hooks/use-upgrade-modal";
import { EntityEmptyState } from "@/features/entity/ui/components/entity-empty-state";

import { useCreateWorkflow } from "../../hooks/use-create-workflow";

export const WorkflowsEmpty = () => {
  const router = useRouter();
  const createWorkflow = useCreateWorkflow();
  const { handleError, modal } = useUpgradeModal();

  const handleCreate = () => {
    createWorkflow.mutate(undefined, {
      onError: (error) => {
        handleError(error);
      },
      onSuccess: (data) => {
        const workflowId = data.id;

        router.push(`/workflows/${workflowId}`);
        router.refresh();
      },
    });
  };

  return (
    <>
      {modal}
      <EntityEmptyState
        onNew={handleCreate}
        message="You haven't created any workflows yet. Get started by creating your first workflow"
      />
    </>
  );
};
