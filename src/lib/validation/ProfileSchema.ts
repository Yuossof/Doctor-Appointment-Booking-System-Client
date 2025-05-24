import { z } from "zod";

export const ProfileSchema = z

  .object({

    first_name: z
      .string()
      .min(1, { message: 'First Name Is Required' })
      .trim(),

    last_name: z
      .string()
      .min(1, { message: 'Last Name Is Required' })
      .trim(),
    gender: z
      .string()
      .min(1, { message: 'Gender Is Required' })
      .trim(),

  })
