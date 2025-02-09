import { z } from "zod";

export const ContactSchema = z
.object({
  message: z.string().min(1, { message: 'Message Is Required' }).trim(),
})