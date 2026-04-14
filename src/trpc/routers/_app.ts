import prisma from "@/db";
import { createTRPCRouter, protectedProcedure } from "../init";
import { inngest } from "@/inngest/client";
import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export const appRouter = createTRPCRouter({
  getWorkflows: protectedProcedure.query(() => {
    return prisma.workflow.findMany();
  }),
  createWorkflow: protectedProcedure.mutation(async () => {
    await inngest.send({
      name: "app/workflow.created",
    });

    return { success: true, message: "Workflow Created" };
  }),
  testAi: protectedProcedure.mutation(async () => {
    await inngest.send({
      name: "app/execute.ai",
    });

    return { success: true, message: "AI Executed" };
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
