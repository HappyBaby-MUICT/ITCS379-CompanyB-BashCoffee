import { Module } from '@nestjs/common'

import { StripePublicController } from './public/public.controller'
import { StripePublicService } from './public/public.service'

@Module({
  controllers: [StripePublicController],
  providers: [StripePublicService],
})
export class StripeModule {}
