import { Injectable } from '@nestjs/common'
import { MenuSelector } from './constants/MenuSelector'
import { messagingApi } from '@line/bot-sdk'
import { FlexContainer, Message } from '@line/bot-sdk/dist/messaging-api/api'
import { MenuDetail } from './constants/MenuDetail'
import { PrismaService } from '@bash-coffee/db'

@Injectable()
export class LinePublicService {
  private readonly client

  constructor(private readonly db: PrismaService) {
    const { MessagingApiClient } = messagingApi
    this.client = new MessagingApiClient({
      channelAccessToken: process.env.HAPPYBABY_LINE_CHANNEL as string,
    })
  }

  private async sendTextMessage(replyToken: string, message: string) {
    const payload: Message = { type: 'text', text: message }

    await this.client.replyMessage({ replyToken, messages: [payload] })
  }

  private async sendFlexMessage(
    replyToken: string,
    flexMessage: FlexContainer,
  ) {
    await this.client.replyMessage({
      replyToken,
      messages: [
        {
          type: 'flex',
          altText: 'Bash - Flex Message',
          contents: flexMessage,
        },
      ],
    })
  }

  async handleMenuMessage(replyToken: string) {
    if (replyToken) {
      await this.sendFlexMessage(replyToken, MenuSelector)
    }
  }

  async handlePostBack(replyToken: string) {
    if (replyToken) {
      await this.sendFlexMessage(replyToken, MenuDetail)
    }
  }
}
