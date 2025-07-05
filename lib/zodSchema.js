import { z } from "zod";

export const zSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(64, "Password must be less than 64 characters"),
});
