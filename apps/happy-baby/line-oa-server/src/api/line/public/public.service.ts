import { FlexContainer, Message } from '@line/bot-sdk/dist/messaging-api/api'
import { createMenuSelector } from './constants/MenuSelector'
import { PrismaService } from '@bash-coffee/db'
import { messagingApi } from '@line/bot-sdk'
import { Injectable } from '@nestjs/common'
import { JsonValue, Decimal } from '@prisma/client/runtime/library'
import { createMenuDetail } from './constants/MenuDetail'
import { MenuName } from './dto'

@Injectable()
export class LinePublicService {
  private readonly client

  constructor(private readonly db: PrismaService) {
    const { MessagingApiClient } = messagingApi
    this.client = new MessagingApiClient({
      channelAccessToken: process.env.HAPPYBABY_LINE_CHANNEL as string,
    })
  }

  private transformMenus = (
    menus: { name: JsonValue; list_price: Decimal | null }[],
  ): { name: string; list_price: number }[] => {
    return menus.map(menu => ({
      name:
        typeof menu.name === 'string' ? menu.name : JSON.stringify(menu.name), // Convert JsonValue to string
      list_price: menu.list_price ? menu.list_price.toNumber() : 0, // Convert Decimal to number
    }))
  }

  private chunkArray = <T>(array: T[], size: number): T[][] => {
    const result: T[][] = []
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size))
    }
    return result
  }

  private async sendMessages(replyToken: string, messages: Message[]) {
    const messageChunks = this.chunkArray(messages, 5)

    for (const chunk of messageChunks) {
      await this.client.replyMessage({
        replyToken,
        messages: chunk,
      })
    }
  }

  async handleMenuMessage(userId: string, replyToken: string) {
    const menus = await this.db.product_template.findMany({
      select: {
        name: true,
        list_price: true,
      },
    })

    const transformedMenus = this.transformMenus(menus)
    const menuChunks = this.chunkArray(transformedMenus, 6)

    const messages: Message[] = []

    messages.push({
      type: 'text',
      text: 'Please select the menu you want to order:',
    })

    for (const chunk of menuChunks) {
      const flexMessage: FlexContainer = createMenuSelector(chunk)

      messages.push({
        type: 'flex',
        altText: 'Bash - Flex Message',
        contents: flexMessage,
      })
    }

    const messageBatches = this.chunkArray(messages, 5)

    try {
      if (messageBatches) {
        await this.client.replyMessage({
          replyToken,
          messages: messageBatches[0],
        })
        messageBatches.shift()
      }

      for (const batch of messageBatches) {
        await this.client.pushMessage({ to: userId, messages: batch })
      }
    } catch (error) {
      console.error('Error sending messages:', error)
    }
  }

  async handleMenuClick(userId: string, replyToken: string, menu: string) {
    const menuDetail = await this.db.product_template.findFirst({
      where: {
        name: {
          path: ['en_US'],
          equals: menu,
        },
      },
    })

    if (!menuDetail) {
      console.error('Menu not found or has missing fields:', menu)
      return
    }

    const messages: Message[] = []

    messages.push({
      type: 'text',
      text: 'Please recheck your order details',
    })

    const name = (menuDetail.name as MenuName)?.en_US ?? 'N/A'
    const description = (menuDetail.description as MenuName)?.en_US ?? 'N/A'

    const flexMessage: FlexContainer = createMenuDetail({
      name: name,
      price: menuDetail.list_price?.toString() ?? '0',
      description: description,
      imageUrl: 'https://via.placeholder.com/150',
      sweetness: '100%', 
      addOns: [],
    })

    messages.push({
      type: 'flex',
      altText: 'Bash - Menu Detail',
      contents: flexMessage,
    })

    try {
      await this.client.replyMessage({
        replyToken,
        messages,
      })
      await this.client.createRichMenu({
        size: {
          width: 2500,
          height: 1686,
        },
        selected: true,
        name: 'richmenu',
        chatBarText: 'Tap here',
        areas: [
          {
            bounds: {
              x: 0,
              y: 0,
              width: 2500,
              height: 1686,
            },
            action: {
              type: 'message',
              text: 'order',
            },
          },
        ],
      })
    } catch (error) {
      console.error('Error sending menu detail message:', error)
    }
  }
}
