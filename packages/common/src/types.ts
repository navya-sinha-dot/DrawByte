import { z } from "zod";

export const CreateUserSchema = z.object({
  username: z.string().max(20).min(5),
  email: z.string().max(100).min(5),
  password: z.string(),
});

export const SigninSchema = z.object({
  username: z.string().max(20).min(5),
  password: z.string(),
});

export const roomSchema = z.object({
  name: z.string().max(20).min(5),
});
