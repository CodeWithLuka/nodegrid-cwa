import z from "zod";
import { generateSlug } from "random-word-slugs";

import type { Node, Edge } from "@xyflow/react";

import prisma from "@/db";
import { PAGINATION } from "@/constants";
import { NodeType } from "@/generated/prisma/enums";
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
        nodes: {
          create: {
            type: NodeType.INITIAL,
            position: { x: 0, y: 0 },
            name: NodeType.INITIAL,
          },
        },
      },
    });

    return createdWorkflow;
  }),
  getMany: protectedProcedure
    .input(
      z.object({
        page: z.number().default(PAGINATION.DEFAULT_PAGE),
        pageSize: z
          .number()
          .min(PAGINATION.MIN_PAGE_SIZE)
          .max(PAGINATION.MAX_PAGE_SIZE)
          .default(PAGINATION.DEFAULT_PAGE_SIZE),
        search: z.string().default(PAGINATION.SEARCH),
      }),
    )
    .query(async ({ ctx, input }) => {
      const userId = ctx.auth.user.id;
      const { page, pageSize, search } = input;

      const [items, totalCount] = await Promise.all([
        prisma.workflow.findMany({
          skip: (page - 1) * pageSize,
          take: pageSize,
          where: {
            userId,
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
          orderBy: {
            updatedAt: "desc",
          },
        }),
        prisma.workflow.count({
          where: {
            userId,
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
        }),
      ]);

      const totalPages = Math.ceil(totalCount / pageSize);
      const hasNextPage = page < totalPages;
      const hasPreviousPage = page > 1;

      return {
        items,
        page,
        pageSize,
        totalCount,
        totalPages,
        hasNextPage,
        hasPreviousPage,
      };
    }),
  getOne: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const userId = ctx.auth.user.id;
      const workflowId = input.id;

      const workflow = await prisma.workflow.findUniqueOrThrow({
        where: { id: workflowId, userId },
        include: { nodes: true, connections: true },
      });

      // Transform server nodes to react-flow compatible nodes
      const nodes: Node[] = workflow.nodes.map((node) => ({
        id: node.id,
        type: node.type,
        position: node.position as { x: number; y: number },
        data: (node.data as Record<string, unknown>) || {},
      }));

      // Transform server connections to react-flow compatible edges
      const edges: Edge[] = workflow.connections.map((connection) => ({
        id: connection.id,
        source: connection.fromNodeId,
        target: connection.toNodeId,
        sourceHandle: connection.fromOutput,
        targetHandle: connection.toInput,
      }));

      return {
        id: workflow.id,
        name: workflow.name,
        nodes,
        edges,
      };
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
