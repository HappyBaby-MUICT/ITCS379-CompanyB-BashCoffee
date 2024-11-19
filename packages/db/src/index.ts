import { PrismaModule } from './prisma.module'
import { PrismaService } from './prisma.service'
import { PrismaClient, Prisma as PrismaTypes } from '../odoo/dist/odoo/client'
import type * as PrismaModels from '../odoo/dist/odoo/client'

export { PrismaTypes, PrismaClient, PrismaModule, PrismaService, PrismaModels }
