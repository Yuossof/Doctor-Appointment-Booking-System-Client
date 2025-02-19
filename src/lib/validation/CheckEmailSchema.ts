import { z } from "zod";

export const CheckEmail = z.object({
    email: z.string().min(1, { message: 'Email Is Required' }).email().trim()
})