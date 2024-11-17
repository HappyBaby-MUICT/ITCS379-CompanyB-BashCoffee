import { z } from 'zod'

export const InquiryArgs = z.object({
  fullName: z.string(),
  email: z.string(),
  phone: z.string(),
  corporateType: z.string(),
  companyName: z.string().optional(),
  availableHours: z.date(),
  message: z.string().optional(),
  packageName: z.string().optional(),
})
