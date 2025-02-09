import { z } from "zod";

export const ForgetPasswordSchema = z.object({

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

    password_confirmation: z.string().trim(),

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