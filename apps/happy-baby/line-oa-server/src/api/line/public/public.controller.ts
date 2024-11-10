import { Controller, Get, Post, Req } from '@nestjs/common'
import { FastifyRequest } from 'fastify'

import { LineEvent, MessageEvent, PostbackEvent } from './dto'
import { LinePublicService } from './public.service'

const userStates: Record<string, { state: string }> = {}

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
    const events = req.body?.events || []
    const userId = events[0]?.source?.userId

    if (!events.length || !userId) return { status: 'ok' }

    await Promise.all(
      events.map(async event => {
        if (event.type === 'message') {
          await this.handleMessageEvent(event as MessageEvent, userId)
        } else if (event.type === 'postback') {
          await this.handlePostbackEvent(event as PostbackEvent, userId)
        }
      }),
    )

    return { status: 'ok' }
  }

  private async handleMessageEvent(event: MessageEvent, userId: string) {
    const { replyToken, message } = event
    if (!replyToken || message.type !== 'text' || !message.text) return

    const userState = userStates[userId]?.state

    switch (userState) {
      case 'entering_address':
        await this.service.saveDeliveryAddress(userId, replyToken, message.text)
        userStates[userId] = { state: 'entering_phone' }
        break

      case 'entering_phone':
        await this.service.savePhoneNumber(userId, replyToken, message.text)
        userStates[userId] = { state: '' }
        break

      default:
        await this.service.handleGeneralInput(userId, replyToken, message.text)
    }
  }

  private async handlePostbackEvent(event: PostbackEvent, userId: string) {
    const { replyToken, postback } = event
    if (!replyToken || !postback.data) return

    const postBackData = JSON.parse(postback.data)
    const state = postBackData?.state

    const handlers: Record<string, () => Promise<void>> = {
      order: () =>
        this.service.handleMenuClick(userId, replyToken, postBackData.menu),
      add_on_yes: () =>
        this.service.handleAddOnSelection(
          userId,
          replyToken,
          postBackData.menu,
          postBackData.selectedAddOns,
        ),
      sweetness_select: () =>
        this.service.handleSweetnessSelection(
          userId,
          replyToken,
          postBackData.menu,
          postBackData.selectedAddOns,
        ),
      goto_confirm: () =>
        this.service.handleConfirm(
          userId,
          replyToken,
          postBackData.menu,
          postBackData.selectedAddOns || [],
          postBackData.sweetness || 0,
        ),
      goto_delivery_address: async () => {
        userStates[userId] = { state: 'entering_address' }
        this.service.handleDelivery(replyToken)
      },
      jump_success: () => this.service.updateMenuStatus(replyToken, userId),
    }

    if (handlers[state]) await handlers[state]()
  }
}
