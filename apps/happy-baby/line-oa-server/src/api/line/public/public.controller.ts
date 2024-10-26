import { Controller, Get, Post, Req } from '@nestjs/common'
import { FastifyRequest } from 'fastify'

import { LineEvent, MessageEvent, PostbackEvent } from './dto'
import { LinePublicService } from './public.service'

@Controller('/api/line/public')
export class LinePublicController {
  constructor(private readonly service: LinePublicService) {}

  @Get('/')
  handlePing() {
    return { status: 'ok' }
  }

  @Post('/webhook')
  async handleWebhook(
    @Req() req: FastifyRequest<{ Body: { events: LineEvent[] } }>,
  ) {
    const events = req.body?.events
    const userId = events[0].source.userId

    if (!events || !userId) {
      return { status: 'ok' }
    }

    await Promise.all(
      events.map(async event => {
        switch (event.type) {
          case 'message':
            if ((event as MessageEvent).message.type === 'text') {
              const messageEvent = event as MessageEvent

              if (!messageEvent.replyToken) {
                return
              }

              switch (messageEvent?.message?.text?.toLowerCase()) {
                case 'order':
                  await this.service.handleMenuMessage(
                    userId,
                    messageEvent.replyToken,
                  )
                  break
              }
            }
            break
          case 'postback':
            // handle postback event
            const postbackEvent = event as PostbackEvent
            const postBackData = JSON.parse(postbackEvent.postback.data)

            if (!postbackEvent.replyToken) {
              return
            }

            if (!postBackData) {
              return 
            }

            switch (postBackData.state) { 
              case 'order':
                await this.service.handleMenuClick(
                  userId,
                  postbackEvent.replyToken,
                  postBackData.menu,
                )
                break
            }
            break
        }
      }),
    )

    return { status: 'ok' }
  }
}
