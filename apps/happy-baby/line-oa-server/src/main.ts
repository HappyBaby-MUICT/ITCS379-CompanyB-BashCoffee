import { NestFactory } from '@nestjs/core'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'

import { AppModule } from './app.module'

const main = async () => {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ bodyLimit: 33554432 }),
    {
      bodyParser: true,
      cors: { origin: '*' },
    },
  )

  await app.listen(4000, '0.0.0.0').then(() => {
    console.log(`Server: http://127.0.0.1:4000/`)
  })
}

main()
