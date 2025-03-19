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
    
    phone: z.
    string()
    .min(1, { message: 'Phone Is Required' })
    .regex(/^[0-9]+$/, { message: 'Phone Must Be A Number From 0 To 9' })
    .trim(),

    gender: z
    .string()
    .min(1, { message: 'Gender Is Required' })
    .trim(),

    address: z
    .string()
    .min(1, { message: 'Address Is Required' })
    .trim(),

    city: z
    .string()
    .min(1, { message: 'City Is Required' })
    .trim(),

  })
