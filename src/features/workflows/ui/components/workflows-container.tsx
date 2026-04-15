import { EntityContainer } from "@/features/entity/ui/components/entity-container";

import { WorkflowsHeader } from "./workflows-header";

export const WorkflowsContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <EntityContainer
      header={<WorkflowsHeader />}
      search={<></>} //{<WorkflowsSearch />}
      pagination={<></>} //{<WorkflowsPagination />}
    >
      {children}
    </EntityContainer>
  );
};
