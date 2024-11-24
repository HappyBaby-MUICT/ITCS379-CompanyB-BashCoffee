import { AuthService, Context, getUserFromContext } from '@bash-coffee/common'
import { PrismaService } from '@bash-coffee/line-db'
import { BadRequestException, Injectable } from '@nestjs/common'

import {
  LoginArgs,
  RedeemCouponArgs,
  RegisterArgs,
  UpdateUserArgs,
} from './public.dto'

@Injectable()
export class LiffPublicService {
  constructor(
    private readonly db: PrismaService,
    private readonly authService: AuthService,
  ) {}

  async register(args: RegisterArgs) {
    const { firstName, lastName, email, phoneNumber } = args
    const exist = await this.db.lineUser.findUnique({
      where: { phoneNumber },
    })

    if (exist) {
      throw new BadRequestException('User already exists')
    }

    await this.db.lineUser.create({
      data: { firstName, lastName, email, points: 0, phoneNumber },
    })
  }

  async login(args: LoginArgs) {
    const { phoneNumber, otp } = args

    const exist = await this.db.otp.findFirst({
      where: {
        otp,
        user: {
          phoneNumber,
        },
      },
      include: {
        user: true,
      },
    })

    if (!exist) {
      throw new BadRequestException('Invalid Credentials')
    }

    if (!exist.user.isVerified) {
      await this.db.lineUser.update({
        where: { id: exist.user.id },
        data: { isVerified: true },
      })
    }

    return this.authService.generateToken(exist.user.id)
  }

  async updateUser(args: UpdateUserArgs, ctx: Context) {
    const user = getUserFromContext(ctx)
    const { firstName, lastName, email } = args

    if (!user) {
      throw new BadRequestException('User does not exist')
    }

    await this.db.lineUser.update({
      where: { id: user.id },
      data: { firstName, lastName, email },
    })
  }

  getMe(ctx: Context) {
    const user = getUserFromContext(ctx)

    return user
  }

  async getCoupons() {
    const coupons = await this.db.coupon.findMany()

    return coupons
  }

  async getCoupon(id: string) {
    const coupon = await this.db.coupon.findUnique({
      where: { id },
    })

    return coupon
  }

  async redeemCoupon(args: RedeemCouponArgs, ctx: Context) {
    const user = getUserFromContext(ctx)
    const coupon = await this.db.coupon.findUnique({
      where: { id: args.couponId },
    })

    if (!coupon) {
      throw new BadRequestException('Coupon does not exist')
    }

    const existUser = await this.db.lineUser.findUnique({
      where: { id: user.id },
      include: { coupons: true },
    })

    if (user.points < coupon.points) {
      throw new BadRequestException('Not enough points')
    }

    if (!existUser) {
      throw new BadRequestException('User does not exist')
    }

    await this.db.$transaction([
      this.db.lineUser.update({
        where: { id: user.id },
        data: { points: existUser.points - coupon.points },
      }),
      this.db.transactionHistory.create({
        data: {
          userId: user.id,
          amount: coupon.points,
          type: 'POINT_DEDUCT',
        },
      }),
      this.db.userCoupons.create({
        data: { couponId: coupon.id, userId: user.id, amount: 1 },
      }),
    ])
  }

  async getTransactionHistory(ctx: Context) { 
    const user = getUserFromContext(ctx)
    const history = await this.db.transactionHistory.findMany({
      where: { userId: user.id },
    })

    return history
  }
}
