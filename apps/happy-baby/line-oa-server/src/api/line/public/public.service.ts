import { Client, FlexMessage } from '@line/bot-sdk'
import { Injectable } from '@nestjs/common'

@Injectable()
export class LinePublicService {
  private readonly client: Client

  constructor() {
    this.client = new Client({
      channelAccessToken: process.env.HAPPYBABY_LINE_CHANNEL as string,
      channelSecret: process.env.HAPPYBABY_LINE_SECRET as string,
    })
  }

  async sendTextMessage(replyToken: string, message: string) { 
    await this.client.replyMessage(replyToken, {
      type: 'text',
      text: message,
    })
  }

  async sendFlexMessage(
    replyToken: string,
    question: string,
    options: string[],
  ) {
    const flexMessage = {
      type: 'flex',
      altText: 'Test Quiz Game',
      contents: {
        type: 'bubble',
        body: {
          type: 'box',
          layout: 'vertical',
          contents: [
            {
              type: 'text',
              text: question,
              weight: 'bold',
              size: 'lg',
            },
            {
              type: 'separator',
              margin: 'md',
            },
            {
              type: 'box',
              layout: 'vertical',
              margin: 'lg',
              spacing: 'sm',
              contents: options.map((option, index) => ({
                type: 'button',
                action: {
                  type: 'postback',
                  label: option,
                  data: `answer=${index}`,
                },
              })),
            },
          ],
        },
      },
    } as FlexMessage

    await this.client.replyMessage(replyToken, [flexMessage])
  }
}
