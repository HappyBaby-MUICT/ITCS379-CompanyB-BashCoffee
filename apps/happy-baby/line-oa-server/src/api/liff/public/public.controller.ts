import { Context } from '@bash-coffee/common'
import { Body, Controller, Get, HttpStatus, Param, Post, Req } from '@nestjs/common'

import {
  LoginArgs,
  RedeemCouponArgs,
  RegisterArgs,
  UpdateUserArgs,
} from './public.dto'
import { LiffPublicService } from './public.service'

@Controller('/api/liff/public')
export class LiffPublicController {
  constructor(private readonly service: LiffPublicService) {}

  @Get('/me')
  async getMe(@Req() ctx: Context) {
    const res = await this.service.getMe(ctx)

    return { statusCode: HttpStatus.OK, data: res }
  }

  @Post('/register')
  async register(@Body() args: RegisterArgs) {
    const res = await this.service.register(args)

    return { statusCode: HttpStatus.OK, data: res }
  }

  @Post('/login')
  async login(@Body() args: LoginArgs) {
    const res = await this.service.login(args)

    return { statusCode: HttpStatus.OK, data: res }
  }

  @Post('/update')
  async updateUser(@Body() args: UpdateUserArgs, @Req() ctx: Context) {
    await this.service.updateUser(args, ctx)

    return { statusCode: HttpStatus.OK }
  }

  @Get('/coupons/list')
  async getCouponsList() {
    const res = await this.service.getCoupons()

    return { statusCode: HttpStatus.OK, data: res }
  }

  @Get('/coupons/:id')
  async getCoupon(@Param('id') id: string) {
    const res = await this.service.getCoupon(id)

    return { statusCode: HttpStatus.OK, data: res }
  }

  @Post('/coupons/redeem')
  async redeemCoupon(@Body() args: RedeemCouponArgs, @Req() ctx: Context) {
    const res = await this.service.redeemCoupon(args, ctx)

    return { statusCode: HttpStatus.OK, data: res }
  }

  @Get('/me/history')
  async getTransactionHistory(@Req() ctx: Context) { 
    const res = await this.service.getTransactionHistory(ctx)

    return { statusCode: HttpStatus.OK, data: res }
  }

  @Get('/me/coupons')
  async getUserCoupons(@Req() ctx: Context) { 
    const res = await this.service.getUserCoupons(ctx)
    
    return { statusCode: HttpStatus.OK, data: res }
  }

  @Get('/me/coupon/:id')
  async getUserCoupon(@Param('id') id: string, @Req() ctx: Context) {
    const res = await this.service.getUserCoupon(id, ctx)

    return { statusCode: HttpStatus.OK, data: res }
  }
}
