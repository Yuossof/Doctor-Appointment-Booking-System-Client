import { z } from "zod";

export const RegisterSchema = z
  .object({
    first_name: z.string().min(1, { message: 'First Name Is Required' }).trim(),
    last_name: z.string().min(1, { message: 'Last Name Is Required' }).trim(),
    phone: z.string().min(1, { message: 'Phone Is Required' })
    .regex(/^[0-9]+$/, { message: 'Phone Must Be A Number From 0 To 9' }).trim(),
    email: z
      .string()
      .min(1, { message: 'Email Is Required' })
      .email({ message: 'Field Must Be Email' })
      .trim(),
    gender: z.string().min(1, { message: 'Gender Is Required' }).trim(),
    password: z
      .string()
      .min(1, { message: 'Password Is Required' })
      .min(8, { message: 'Password Must Be At Least 8 Characters' })
      .trim(),
    password_confirmation: z.string().trim(),
    birth_date: z
      .string()
      .min(1, { message: 'Birth Date Is Required' })
      .refine((value) => !isNaN(Date.parse(value)), {
        message: 'Please enter a valid date.',
      }),

  })
  .superRefine((data, ctx) => {
    if (data.password !== data.password_confirmation) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords Must Be Matched",
        path: ["password_confirmation"],
      });
    }
  });
