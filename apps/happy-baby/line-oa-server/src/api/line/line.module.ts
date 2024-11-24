import { Module } from '@nestjs/common'

import { LinePublicController } from './public/public.controller'
import { LinePublicService } from './public/public.service'

@Module({
  controllers: [LinePublicController],
  providers: [LinePublicService],
})
export class LineModule {}
