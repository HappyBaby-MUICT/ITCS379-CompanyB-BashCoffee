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

    if (!events) {
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

              if (messageEvent?.message?.text?.toLowerCase() === 'order') {
                // handle order event
                await this.service.handleMenuMessage(messageEvent.replyToken)
              }
            }
            break
          case 'postback':
            // handle postback event
            const postbackEvent = event as PostbackEvent
            if (!postbackEvent.replyToken) {
              return
            }

            await this.service.handlePostBack(postbackEvent.replyToken)
            break
        }
      }),
    )

    return { status: 'ok' }
  }
}
