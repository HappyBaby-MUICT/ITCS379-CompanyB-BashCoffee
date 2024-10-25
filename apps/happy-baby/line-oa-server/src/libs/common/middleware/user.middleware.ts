import { Injectable, NestMiddleware } from '@nestjs/common'
import { FastifyReply, FastifyRequest } from 'fastify'

import { Context } from '../utils'
import { AuthService } from '../auth/auth.service'
import { PrismaService } from '../../prisma/prisma.service'

type Request = FastifyRequest & Context['raw']

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(
    private readonly db: PrismaService,
    private readonly authService: AuthService,
  ) {}

  async use(req: Request, _res: FastifyReply, next: () => void) {
    try {
      const token = req.headers.authorization?.split(' ')[1]
      if (!token) {
        req.user = null

        return next()
      }

      const { id } = this.authService.verifyToken(token)
      req.user = await this.db.user.findUnique({ where: { id } })

      return next()
    } catch {
      req.user = null

      return next()
    }
  }
}
