import prisma from "@/db";
import { inngest } from "./client";
import { createOpenAI } from "@ai-sdk/openai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";

const google = createGoogleGenerativeAI();
const openAi = createOpenAI();
const anthropic = createAnthropic();

export const processTask = inngest.createFunction(
  { id: "execute-ai", triggers: { event: "app/execute.ai" } },
  async ({ event, step }) => {
    const { steps: geminiSteps } = await step.ai.wrap(
      "gemini-generate-text",
      generateText,
      {
        model: google("gemini-2.5-flash"),
        system: "You are a helpful assistant",
        prompt: "What is aerodynamics?.",
      },
    );

    const { steps: openAiSteps } = await step.ai.wrap(
      "open-ai-generate-text",
      generateText,
      {
        model: openAi("gpt-4o"),
        system: "You are a helpful assistant",
        prompt: "What is aerodynamics?.",
      },
    );

    const { steps: anthropicSteps } = await step.ai.wrap(
      "anthropic-generate-text",
      generateText,
      {
        model: anthropic("claude-opus-4-0"),
        system: "You are a helpful assistant",
        prompt: "What is aerodynamics?.",
      },
    );

    return {
      geminiSteps,
      openAiSteps,
      anthropicSteps,
    };
  },
);
