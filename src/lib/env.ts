import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "production"]).default("development"),
    RESEND_API_KEY: z.string().min(1),
    RESEND_FROM: z
      .string()
      .min(1)
      .default("Pendolo Studio <noreply@pendolo.studio>"),
    CONTACT_EMAIL: z.string().email().default("hello@pendolo.studio"),
  },
  client: {
    NEXT_PUBLIC_ENVIRONMENT: z.enum(["local", "production"]),
    NEXT_PUBLIC_BASE_URL: z.string().min(1),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_ENVIRONMENT: process.env.NEXT_PUBLIC_ENVIRONMENT,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  },
});
