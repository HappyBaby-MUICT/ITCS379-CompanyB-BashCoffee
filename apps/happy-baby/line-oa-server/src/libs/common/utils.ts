import { UnauthorizedException } from '@nestjs/common'
import { FastifyRequestContext } from 'fastify'

import { PrismaModels } from '../prisma'

export type Context = FastifyRequestContext & {
  raw: {
    user: PrismaModels.User | null
  }
}

export const getUserFromContext = (ctx: Context) => {
  const user = ctx.raw.user
  if (!user) {
    throw new UnauthorizedException()
  }

  return user
}
