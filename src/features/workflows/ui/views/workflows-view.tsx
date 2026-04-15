"use client";

import { useSuspenseWorkflows } from "../../hooks/use-suspense-workflows";

export const WorkflowsView = () => {
  const { data } = useSuspenseWorkflows();

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black gap-6">
      <h1> Think, Workflows View</h1>
      <p>{JSON.stringify(data, null, 2)}</p>
    </div>
  );
};
