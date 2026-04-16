"use client";

import { useEntitySearch } from "@/features/entity/hooks/use-entity-search";
import { EntitySearch } from "@/features/entity/ui/components/entity-search";

import { useWorkflowsParams } from "../../hooks/use-workflows-params";

export const WorkflowsSearch = () => {
  const [params, setParams] = useWorkflowsParams();
  const { searchValue, onSearchChange } = useEntitySearch({
    params,
    setParams,
  });

  return (
    <EntitySearch
      value={searchValue}
      onChange={onSearchChange}
      placeholder="Search workflows"
    />
  );
};
