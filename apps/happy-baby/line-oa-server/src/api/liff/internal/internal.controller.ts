import { Body, Controller, HttpStatus, Post } from '@nestjs/common'

import { SendOtpArgs, VerifyOtpArgs } from './internal.dto'
import { LiffInternalService } from './internal.service'

@Controller('/api/liff/internal')
export class LiffInternalController {
  constructor(private readonly service: LiffInternalService) {}

  @Post('/otp/send')
  async sendOtp(@Body() args: SendOtpArgs) {
    await this.service.sendOtp(args)

    return { statusCode: HttpStatus.OK }
  }

  @Post('/otp/verify')
  async verifyOtp(@Body() args: VerifyOtpArgs) {
    const result = await this.service.verifyOtp(args)

    return { statusCode: result ? HttpStatus.OK : HttpStatus.BAD_REQUEST }
  }
}
