import { AuthModule } from '@bash-coffee/common'
import { PrismaModule } from '@bash-coffee/db'
import { PrismaModule as LinePrismaModule } from '@bash-coffee/line-db'
import { Module } from '@nestjs/common'
import { APP_PIPE } from '@nestjs/core'
import { LiffModule } from 'api/liff/liff.module'
import { LineModule } from 'api/line/line.module'
import { StripeModule } from 'api/stripe/stripe.module'
import { ZodValidationPipe } from 'nestjs-zod'

@Module({
  imports: [AuthModule, LineModule, PrismaModule, LinePrismaModule, StripeModule, LiffModule],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(UserMiddleware).forRoutes('*')
  // }
}
