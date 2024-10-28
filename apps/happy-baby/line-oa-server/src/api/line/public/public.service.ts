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
import { bakeryMenus } from './constants/EligibleMenus'
import { createOrderDetail } from './constants/OrderDetail'

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

  private parseCustomerNote(note: string): Record<string, string> {
    const parts = note.split(',')
    const parsedNote: Record<string, string> = {}

    parts.forEach(part => {
      const [key, value] = part.split(':').map(part => part.trim())
      if (key && value) {
        parsedNote[key] = value
      }
    })

    return parsedNote
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
      imageUrl: `https://haishin.selenadia.net/netdeliver/images/line-oa/${name.toLowerCase().replace(/ /g, '_')}.png`,
      sweetness: 'none',
      selctedAddOns: [],
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
    } catch (error) {
      console.error('Error sending menu detail message:', error)
    }
  }

  async handleAddOnSelection(
    userId: string,
    replyToken: string,
    menu: string,
    selectedAddOns: string[] = [],
  ) {
    const addOnConfirmFlexMessage = addOnConfirmMessage(menu, selectedAddOns)

    const messages: Message[] = []

    if (selectedAddOns.length !== 0) {
      messages.push({
        type: 'text',
        text: 'You have added addons: ' + selectedAddOns.join(', '),
      })
    }

    messages.push(
      {
        type: 'text',
        text:
          selectedAddOns.length === 0
            ? 'Do you want to add an add-on?'
            : 'Do you want to add more add-on?',
      },
      {
        type: 'flex',
        altText: 'Select an add-ons',
        contents: addOnConfirmFlexMessage,
      },
    )
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
        text: 'Please select sweetness level',
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

  async handleConfirm(
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
      include: {
        product_product: true,
      },
    })

    if (!menuDetail) {
      console.error('Menu not found or has missing fields:', menu)
      return
    }

    const name = (menuDetail.name as MenuName)?.en_US
    const description = (menuDetail.description as MenuName)?.en_US
    let price = menuDetail.list_price?.toNumber()

    if (!name || !description || !price) {
      console.error('Menu has missing fields:', menu)
      return
    }

    let customerNote = ''
    if (sweetness) {
      customerNote += `sweetness: ${sweetness}, `
    }
    if (selectedAddOns.length > 0) {
      customerNote += selectedAddOns.map(addOn => `addOn: ${addOn}`).join(', ')
    }

    selectedAddOns.forEach(addOn => {
      price =
        (price ?? 0) +
        (addOn === 'Oat Milk' ? 15 : 0) +
        (addOn === 'Brown Sugar Jelly' ? 10 : 0)
    })

    const order = await this.db.pos_order.create({
      data: {
        user_id: 1,
        company_id: 1,
        pricelist_id: 1,
        session_id: 1,
        state: 'draft',
        name: `Customer:${userId}`,
        amount_total: price,
        amount_tax: 0,
        amount_paid: 0,
        amount_return: 0,
        date_order: new Date(),
      },
    })

    const posOrderLine = await this.db.pos_order_line.create({
      data: {
        order_id: order.id,
        product_id: menuDetail.product_product[0].id,
        name: `Customer:${userId}`,
        price_subtotal: price,
        price_subtotal_incl: price,
        qty: 1,
        create_uid: 2,
        write_uid: 2,
        company_id: 1,
        full_product_name: name,
        price_unit: price,
        discount: 0,
        is_total_cost_computed: true,
        create_date: new Date(),
        write_date: new Date(),
        price_extra: 0,
        customer_note: customerNote.replace(/, $/, ''),
      },
    })

    const orderDetail = createOrderDetail({
      id: order.id,
      name,
      selectedAddOns,
      sweetness,
      price,
    })
    try {
      await this.client.replyMessage({
        replyToken,
        messages: [
          {
            type: 'text',
            text:
              'Your order has been added to the system!'
          },
          {
            type: 'flex',
            altText: 'Payment',
            contents: orderDetail,
          },
        ],
      })
    } catch (error) {
      console.error('Error handling checkout:', error)
    }
  }

  async handleGeneralInput(
    userId: string,
    replyToken: string,
    text: string | undefined,
  ) {
    if (text && text.toLowerCase() === 'order') {
      await this.handleMenuMessage(userId, replyToken)
    }
  }

  async handleDelivery(replyToken: string) {
    try {
      this.client.replyMessage({
        replyToken,
        messages: [
          {
            type: 'text',
            text: 'Please enter your delivery address:',
          },
        ],
      })
    } catch {}
  }

  async saveDeliveryAddress(
    userId: string,
    replyToken: string,
    address: string,
  ) {
    try {
      const order = await this.db.pos_order.findFirst({
        where: {
          name: `Customer:${userId}`,
          state: 'draft',
        },
        include: {
          pos_order_line: true,
        },
      })

      if (!order || !order.pos_order_line.length) {
        console.error(
          'No active order or order lines found for the user:',
          userId,
        )
        await this.client.replyMessage({
          replyToken,
          messages: [{ type: 'text', text: 'No active order found' }],
        })
        return
      }

      const currentNote = order.pos_order_line[0]?.customer_note || ''
      const updatedNote = `${currentNote}, DeliveryAddress: ${address}`

      await this.db.pos_order.update({
        where: { id: order.id },
        data: {
          pos_order_line: {
            update: {
              where: { id: order.pos_order_line[0].id },
              data: { customer_note: updatedNote.replace(/^, /, '') },
            },
          },
        },
      })

      await this.client.replyMessage({
        replyToken,
        messages: [
          {
            type: 'text',
            text: 'Address saved! Please input your phone number',
          },
        ],
      })
    } catch (error) {
      console.error('Error saving delivery address:', error)
    }
  }

  async savePhoneNumber(userId: string, replyToken: string, phone: string) {
    try {
      const order = await this.db.pos_order.findFirst({
        where: {
          name: `Customer:${userId}`,
          state: 'draft',
        },
        include: {
          pos_order_line: true,
        },
        orderBy: {
          create_date: 'desc',
        },
      })

      if (!order) {
        console.error('No active order found for the user:', userId)
        return
      }

      const currentNote = order.pos_order_line[0]?.customer_note || ''
      const updatedNote = `${currentNote}, Phone Number: ${phone}`.replace(
        /^, /,
        '',
      )

      await this.db.pos_order.update({
        where: { id: order.id },
        data: {
          pos_order_line: {
            update: {
              where: { id: order.pos_order_line[0].id },
              data: { customer_note: updatedNote },
            },
          },
        },
      })

      const totalItems = order.pos_order_line.length
      const totalPrice = order.pos_order_line[0].price_subtotal.toNumber()
      const qrUrl = 'https://placehold.jp/150x150.png'
      let deliveryAddress = ''

      const paymentItems = order.pos_order_line.map(line => {
        const noteParts = this.parseCustomerNote(line.customer_note ?? '')

        const addOns = Object.keys(noteParts)
          .filter(key => key.startsWith('addOn'))
          .map(key => `- add-on: ${noteParts[key]}`)

        // Check for delivery address
        if (noteParts['DeliveryAddress']) {
          deliveryAddress = noteParts['DeliveryAddress']
        }


        return {
          name: line.full_product_name ?? 'Unknown',
          price: line.price_unit ? line.price_unit.toNumber() : 0,
          sweetness: noteParts['sweetness'] ? `${noteParts['sweetness']}` : '-',
          addOns,
        }
      })

      const paymentMessage = createPaymentMessage({
        receiptNumber: `${order.id}`,
        deliveryMethod: deliveryAddress?.toLowerCase().includes('ict')
          ? 'Pick up at Bash Coffee'
          : deliveryAddress,
        phoneNumber: phone,
        items: paymentItems,
        totalItems,
        totalPrice,
        qrUrl,
      })

      await this.client.replyMessage({
        replyToken,
        messages: [
          {
            type: 'text',
            text: 'Phone Number saved! Please proceed to payment as follows',
          },
          {
            type: 'flex',
            altText: 'Payment',
            contents: paymentMessage,
          },
        ],
      })
    } catch (error) {
      console.error('Error saving phone number:', error)
    }
  }

  async updateMenuStatus(replyToken: string, userId: string) {
    const order = await this.db.pos_order.findFirst({
      where: {
        name: `Customer:${userId}`,
        state: 'draft',
      },
      include: {
        pos_order_line: true,
      },
      orderBy: {
        create_date: 'desc',
      },
    })

    if (order) {
      await this.db.pos_order.update({
        where: { id: order.id },
        data: {
          state: 'invoiced',
        },
      })

      await this.client.replyMessage({
        replyToken,
        messages: [
          {
            type: 'text',
            text: 'Your order payment has been confirmed!',
          },
        ],
      })

      return
    }
    return
  }
}
