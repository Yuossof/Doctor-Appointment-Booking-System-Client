import { z } from "zod";

export const addUserSchema = z.object({
    first_name: z.string().min(1, { message: 'First Name Is Required' }).trim(),
    last_name: z.string().min(1, { message: 'Last Name Is Required' }).trim(),
    email: z
      .string()
      .min(1, { message: 'Email Is Required' })
      .email({ message: 'Field Must Be Email' })
      .trim(),
    gender: z.string().min(1, { message: 'Gender Is Required' }).trim(),
    role: z.string().min(1, { message: 'Role Is Required' }).trim(),
    password: z
      .string()
      .min(1, { message: 'Password Is Required' })
      .min(8, { message: 'Password Must Be At Least 8 Characters' })
      .trim(),
})