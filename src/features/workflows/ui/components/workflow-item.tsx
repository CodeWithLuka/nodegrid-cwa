import { WorkflowIcon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

import type { Workflow } from "@/generated/prisma/client";
import { EntityItem } from "@/features/entity/ui/components/entity-item";

import { useRemoveWorkflow } from "../../hooks/use-remove-workflow";

interface WorkflowItemProps {
  data: Workflow;
}

export const WorkflowItem = ({ data }: WorkflowItemProps) => {
  const workflowId = data.id;
  const workflowName = data.name;
  const workflowCreatedAt = data.createdAt;
  const workflowUpdatedAt = data.updatedAt;
  const removeWorkflow = useRemoveWorkflow();

  const handleRemove = () => {
    removeWorkflow.mutate({ id: workflowId });
  };

  const isPending = removeWorkflow.isPending;

  return (
    <EntityItem
      href={`/workflows/${workflowId}`}
      title={workflowName}
      subtitle={
        <>
          Updated {formatDistanceToNow(workflowUpdatedAt, { addSuffix: true })}{" "}
          &bull; Created{" "}
          {formatDistanceToNow(workflowCreatedAt, { addSuffix: true })}
        </>
      }
      image={
        <div className="size-8 flex items-center justify-center">
          <WorkflowIcon className="size-5 text-muted-foreground" />
        </div>
      }
      onRemove={handleRemove}
      isRemoving={isPending}
    />
  );
};
