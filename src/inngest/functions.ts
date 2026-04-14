import prisma from "@/db";
import { inngest } from "./client";

export const processTask = inngest.createFunction(
  { id: "process-task", triggers: { event: "app/workflow.created" } },
  async ({ event, step }) => {
    const result = await step.run("create-workflow", async () => {
      prisma.workflow.create({
        data: {
          name: "Ramparts Inngest Workflow",
        },
      });
    });

    await step.sleep("fetch", "10s");
    await step.sleep("transcribe", "10s");
    await step.sleep("send", "10s");

    return { message: `Work Created`, result };
  },
);
