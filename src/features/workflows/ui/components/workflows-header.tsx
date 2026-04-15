"use client";

import { useRouter } from "next/navigation";

import { EntityHeader } from "@/features/entity/ui/components/entity-header";

import { useCreateWorkflow } from "../../hooks/use-create-workflow";
import { useUpgradeModal } from "@/features/subscriptions/hooks/use-upgrade-modal";

interface WorkflowsHeaderProps {
  disabled?: boolean;
}

export const WorkflowsHeader = ({ disabled }: WorkflowsHeaderProps) => {
  const router = useRouter();
  const createWorkflow = useCreateWorkflow();
  const { handleError, modal } = useUpgradeModal();

  const handleCreate = () => {
    createWorkflow.mutate(undefined, {
      onSuccess: (data) => {
        const workflowId = data.id;

        router.push(`/workflows/${workflowId}`);
        router.refresh();
      },
      onError: (error) => {
        handleError(error);
      },
    });
  };

  return (
    <>
      {modal}
      <EntityHeader
        title="Workflows"
        description="Create and manage your workflows"
        onNew={handleCreate}
        newButtonLabel="New workflow"
        disabled={disabled}
        isCreating={createWorkflow.isPending}
      />
    </>
  );
};
