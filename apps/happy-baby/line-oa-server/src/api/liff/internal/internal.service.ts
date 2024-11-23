import { PrismaService } from '@bash-coffee/line-db'
import { BadRequestException, Injectable } from '@nestjs/common'

import { SendOtpArgs, VerifyOtpArgs } from './internal.dto'

@Injectable()
export class LiffInternalService {
  constructor(private readonly db: PrismaService) {}

  async sendOtp(args: SendOtpArgs) {
    const { phoneNumber } = args

    const token = Math.floor(1000 + Math.random() * 9000).toString()

    const exist = await this.db.lineUser.findMany({
      where: {
        phoneNumber,
      },
    })

    if (!exist) {
      throw new BadRequestException('User not found')
    }

    await this.db.otp.deleteMany({
      where: {
        user: {
          phoneNumber,
        },
      },
    })

    await this.db.otp.create({
      data: {
        otp: token,
        user: {
          connect: {
            phoneNumber,
          },
        },
      },
    })
  }

  async verifyOtp(args: VerifyOtpArgs) {
    const { phoneNumber, otp } = args

    const otpData = await this.db.otp.findFirst({
      where: {
        user: {
          phoneNumber,
        },
        otp,
      },
    })

    if (!otpData) {
      throw new BadRequestException('OTP not found')
    }

    return true
  }
}
