import { PrismaModels } from '@bash-coffee/line-db'
import { UnauthorizedException } from '@nestjs/common'
import { FastifyRequestContext } from 'fastify'

export type Context = FastifyRequestContext & {
  raw: {
    user: PrismaModels.LineUser | null
  }
}

export const getUserFromContext = (ctx: Context) => {
  const user = ctx.raw.user
  if (!user) {
    throw new UnauthorizedException(
      'You are not authenticated to perform this action.',
    )
  }

  return user
}
