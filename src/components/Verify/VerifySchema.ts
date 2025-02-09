import { z } from 'zod'

export const VerfiySchema = z.object({
    code: z
    .string()
    .min(1, { message: 'Code Is Required' })
    .max(5, { message: 'Code Must Be At Least  5 Charachters' })
    .trim()
})