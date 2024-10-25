import { Controller, Get, Post, Req } from '@nestjs/common'
import { FastifyRequest } from 'fastify'

import { LineEvent, MessageEvent, PostbackEvent } from './dto'
import { LinePublicService } from './public.service'

@Controller('/api/line/public')
export class LinePublicController {
  constructor(private readonly service: LinePublicService) { }
  
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
        if (
          event.type === 'message' &&
          (event as MessageEvent).message.type === 'text'
        ) {
          const messageEvent = event as MessageEvent

          if (messageEvent?.message?.text?.toLowerCase() === 'quiz') {
            if (messageEvent.replyToken) {
              const question = 'What is the capital of France?'
              const options = ['Paris', 'Berlin', 'Rome', 'Madrid']
              await this.service.sendFlexMessage(
                messageEvent.replyToken,
                question,
                options,
              )
            }
          }
        } else if (event.type === 'postback') {
          // Handle postback answers
          const postbackEvent = event as PostbackEvent
          const userAnswer = postbackEvent.postback.data.split('=')[1]
          const correctAnswer = '0'
          const replyText =
            userAnswer === correctAnswer ? 'Correct!' : 'Wrong answer!'
          if (postbackEvent.replyToken) {
            await this.service.sendTextMessage(
              postbackEvent.replyToken,
              replyText,
            )
          }
        }
      }),
    )

    return { status: 'ok' }
  }
}
