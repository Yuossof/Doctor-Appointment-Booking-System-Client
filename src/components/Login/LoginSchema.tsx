import { z } from "zod";

export const LoginSchema = z
  .object({

    email: z
      .string()
      .min(1, { message: 'Email Is Required' })
      .email({ message: 'Field Must Be Email' })
      .trim(),

    password: z
      .string()
      .min(1, { message: 'Password Is Required' })
      .min(8, { message: 'Password Must Be At Least 8 Characters' })
      .trim(),

  })