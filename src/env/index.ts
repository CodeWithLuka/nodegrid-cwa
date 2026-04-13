import { z } from "zod";

import { createEnv } from "@t3-oss/env-nextjs";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().min(1),
    DIRECT_URL: z.string().min(1),
    // BETTER_AUTH_SECRET: z.string().min(1),
    // BETTER_AUTH_URL: z.string().min(1),
    APP_URL: z.string().min(1),
    // OPENAI_API_KEY: z.string().min(1),
  },
  experimental__runtimeEnv: {},
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
