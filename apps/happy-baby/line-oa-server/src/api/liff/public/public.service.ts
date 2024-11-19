import { AuthService, Context, getUserFromContext } from '@bash-coffee/common'
import { PrismaService } from '@bash-coffee/line-db'
import { BadRequestException, Injectable } from '@nestjs/common'

import { LoginArgs, RegisterArgs } from './public.dto'

@Injectable()
export class LiffPublicService {
  constructor(
    private readonly db: PrismaService,
    private readonly authService: AuthService,
  ) {}

  async register(args: RegisterArgs) {
    const { firstName, lastName, email, lineToken, phoneNumber } = args
    const exist = await this.db.lineUser.findUnique({
      where: { lineToken },
    })

    if (exist) {
      throw new BadRequestException('User already exists')
    }

    await this.db.lineUser.create({
      data: { firstName, lastName, email, lineToken, points: 0, phoneNumber },
    })
  }

  async login(args: LoginArgs) {
    const { phoneNumber } = args
    const user = await this.db.lineUser.findFirst({
      where: { phoneNumber },
    })

    if (!user) {
      throw new BadRequestException('User not found')
    }

    return this.authService.generateToken(user.id)
  }

  getMe(ctx: Context) {
    const user = getUserFromContext(ctx)

    return {
      ...user,
    }
  }
}
