import { createZodDto } from 'nestjs-zod'
import { z } from 'nestjs-zod/z'

export class SendOtpArgs extends createZodDto(
  z.object({
    phoneNumber: z.string(),
  }),
) {}

export class VerifyOtpArgs extends createZodDto(
  z.object({
    phoneNumber: z.string(),
    otp: z.string(),
  }),
) {}
