import { PrismaModule } from '@bash-coffee/db'
import { Module } from '@nestjs/common'
import { APP_PIPE } from '@nestjs/core'
import { LineModule } from 'api/line/line.module'
import { ZodValidationPipe } from 'nestjs-zod'

@Module({
  imports: [LineModule, PrismaModule],
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
