"use client";

import { EntityList } from "@/features/entity/ui/components/entity-list";

import { WorkflowItem } from "../components/workflow-item";
import { WorkflowsEmpty } from "../components/workflows-empty-state";
import { useSuspenseWorkflows } from "../../hooks/use-suspense-workflows";

export const WorkflowsView = () => {
  const { data: workflows } = useSuspenseWorkflows();

  return (
    <EntityList
      items={workflows.items}
      getKey={(workflow) => workflow.id}
      renderItem={(workflow) => <WorkflowItem data={workflow} />}
      emptyView={<WorkflowsEmpty />}
    />
  );
};
