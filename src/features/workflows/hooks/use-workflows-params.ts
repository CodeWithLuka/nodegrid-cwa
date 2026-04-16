import { useQueryStates } from "nuqs";

import { workflowsParams } from "../server/params";

export const useWorkflowsParams = () => {
  return useQueryStates(workflowsParams);
};
