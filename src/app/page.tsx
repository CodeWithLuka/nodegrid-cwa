"use client";

import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// import { requireAuth } from "@/features/auth/lib/auth-utils";

export default function Home() {
  // await requireAuth();
  const trpc = useTRPC();
  const { data } = useQuery(trpc.getWorkflows.queryOptions());
  const queryClient = useQueryClient();

  const create = useMutation(
    trpc.createWorkflow.mutationOptions({
      onSuccess: () => {
        toast.success("Workflow Created");
        queryClient.invalidateQueries(trpc.getWorkflows.queryOptions());
      },
    }),
  );

  const isPending = create.isPending;

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1 className="text-2xl"> Think, Different</h1>
      <h1 className="text-xl"> Think, {JSON.stringify(data, null, 2)}</h1>
      <Button onClick={() => create.mutate()} disabled={isPending}>
        Create
      </Button>
    </div>
  );
}
