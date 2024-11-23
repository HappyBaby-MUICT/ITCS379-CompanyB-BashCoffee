import { createZodDto } from "nestjs-zod";
import { z } from 'nestjs-zod/z'

export class RegisterArgs extends createZodDto(z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    lineToken: z.string().optional(),
    phoneNumber: z.string(),
})) { }

export class LoginArgs extends createZodDto(z.object({
    phoneNumber: z.string(),
    otp: z.string(),
})) { }