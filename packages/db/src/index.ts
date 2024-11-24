import { PrismaModule } from './prisma.module'
import { PrismaService } from './prisma.service'
import { PrismaClient, Prisma as PrismaTypes } from '../dist/odoo/client'
import type * as PrismaModels from '../dist/odoo/client'

export { PrismaTypes, PrismaClient, PrismaModule, PrismaService, PrismaModels }
