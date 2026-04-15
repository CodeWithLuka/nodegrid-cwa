import z from "zod";
import { generateSlug } from "random-word-slugs";

import prisma from "@/db";
import {
  createTRPCRouter,
  premiumProcedure,
  protectedProcedure,
} from "@/trpc/init";

export const workflowsRouter = createTRPCRouter({
  create: premiumProcedure.mutation(({ ctx }) => {
    const userId = ctx.auth.user.id;

    const createdWorkflow = prisma.workflow.create({
      data: {
        name: generateSlug(2),
        userId,
      },
    });

    return createdWorkflow;
  }),
  getMany: protectedProcedure.query(({ ctx }) => {
    const userId = ctx.auth.user.id;

    const existingWorkflows = prisma.workflow.findMany({
      where: {
        userId,
      },
    });

    return existingWorkflows;
  }),
  getOne: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(({ ctx, input }) => {
      const userId = ctx.auth.user.id;
      const workflowId = input.id;

      const existingWorkflow = prisma.workflow.findUniqueOrThrow({
        where: {
          id: workflowId,
          userId,
        },
      });

      return existingWorkflow;
    }),
  remove: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      const userId = ctx.auth.user.id;

      const workflowId = input.id;

      const deletedWorkflow = prisma.workflow.delete({
        where: {
          id: workflowId,
          userId,
        },
      });

      return deletedWorkflow;
    }),
  updateName: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1),
      }),
    )
    .mutation(({ ctx, input }) => {
      const userId = ctx.auth.user.id;
      const workflowId = input.id;
      const workflowName = input.name;

      const updatedWorkflowName = prisma.workflow.update({
        where: {
          id: workflowId,
          userId,
        },
        data: {
          name: workflowName,
        },
      });

      return updatedWorkflowName;
    }),
});
