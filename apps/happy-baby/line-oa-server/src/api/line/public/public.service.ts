import { FlexContainer, Message } from '@line/bot-sdk/dist/messaging-api/api'
import {
  addOnConfirmMessage,
  createMenuSelector,
} from './constants/MenuSelector'
import { PrismaService } from '@bash-coffee/db'
import { FlexBubble, messagingApi, RichMenu } from '@line/bot-sdk'
import { Injectable } from '@nestjs/common'
import { JsonValue, Decimal } from '@prisma/client/runtime/library'
import { createMenuDetail } from './constants/MenuDetail'
import { MenuName } from './dto'
import { SweetnessLevel } from './constants/SweetnessLevel'
import { createPaymentMessage } from './constants/Payment'

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
      imageUrl: 'https://placehold.jp/150x150.png',
      sweetness: '100%',
      addOns: [],
    })

    const addOnMessage = addOnConfirmMessage(menu)

    messages.push({
      type: 'flex',
      altText: 'Bash - Menu Detail',
      contents: flexMessage,
    })

    messages.push({
      type: 'flex',
      altText: 'Bash - Add-Ons',
      contents: addOnMessage,
    })

    try {
      await this.client.replyMessage({
        replyToken,
        messages,
      })
    } catch (error) {
      console.error('Error sending menu detail message:', error)
    }
  }

  async handleAddOnSelection(
    userId: string,
    replyToken: string,
    menu: string,
    addOn: string,
    selectedAddOns: string[],
  ) {
    selectedAddOns.push(addOn)

    const addOnConfirmFlexMessage = addOnConfirmMessage(menu, selectedAddOns)

    const messages: Message[] = [
      {
        type: 'text',
        text: 'You have added addons: ' + selectedAddOns.join(', '),
      },
      {
        type: 'text',
        text: 'Do you want to add more addons?',
      },
      {
        type: 'flex',
        altText: 'Select more add-ons or finish',
        contents: addOnConfirmFlexMessage,
      },
    ]

    try {
      await this.client.replyMessage({
        replyToken,
        messages,
      })
    } catch (error) {
      console.error('Error handling add-on selection:', error)
    }
  }

  async handleSweetnessSelection(
    userId: string,
    replyToken: string,
    menu: string,
    selectedAddOns: string[],
  ) {
    const messages: Message[] = [
      {
        type: 'text',
        text: 'Please select sweetness',
      },
      {
        type: 'flex',
        altText: 'Select sweetness level',
        contents: SweetnessLevel(menu, selectedAddOns),
      },
    ]

    try {
      await this.client.replyMessage({
        replyToken,
        messages,
      })
    } catch (error) {
      console.error('Error handling sweetness selection:', error)
    }
  }

  async handleCheckout(
    userId: string,
    replyToken: string,
    menu: string,
    selectedAddOns: string[],
    sweetness: number,
  ) {
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

    const name = (menuDetail.name as MenuName)?.en_US
    const description = (menuDetail.description as MenuName)?.en_US

    if (!name || !description) {
      console.error('Menu has missing fields:', menu)
      return
    }

    const paymentMessage = createPaymentMessage({
      receiptNumber: 'test-12',
      deliveryMethod: 'Pick up',
      phoneNumber: '1234567890',
      items: [
        {
          name,
          price: menuDetail.list_price?.toNumber() ?? 0,
          sweetness: sweetness.toString(),
          addOns: selectedAddOns,
        },
      ],
      totalItems: 1,
      totalPrice: menuDetail.list_price?.toNumber() ?? 0,
      qrUrl: 'https://placehold.jp/150x150.png',
    })

    try {
      await this.client.replyMessage({
        replyToken,
        messages: [
          {
            type: 'flex',
            altText: 'Payment',
            contents: paymentMessage,
          },
        ],
      })
    } catch (error) {
      console.error('Error handling checkout:', error)
    }

  }
}