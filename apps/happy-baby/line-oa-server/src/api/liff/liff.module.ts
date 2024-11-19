import { Module } from '@nestjs/common'

// import { LinePublicController } from './public/public.service'
import { LiffInternalController } from './internal/internal.controller'
import { LiffInternalService } from './internal/internal.service'
import { LiffPublicController } from './public/public.controller'
import { LiffPublicService} from './public/public.service'

@Module({
  controllers: [LiffPublicController, LiffInternalController],
  providers: [LiffPublicService, LiffInternalService],
})
export class LiffModule {}
