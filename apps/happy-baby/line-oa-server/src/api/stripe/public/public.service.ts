import { PrismaService } from '@bash-coffee/db'
import { messagingApi } from '@line/bot-sdk'
import { FlexContainer, Message } from '@line/bot-sdk/dist/messaging-api/api'
import { Injectable } from '@nestjs/common'
import { createOrderDoing } from 'api/line/public/constants/OrderDoing'
import stripe from 'stripe'

@Injectable()
export class StripePublicService {
  private readonly client
  private readonly payment

  constructor(private readonly db: PrismaService) {
    const { MessagingApiClient } = messagingApi
    this.client = new MessagingApiClient({
      channelAccessToken: process.env.HAPPYBABY_LINE_CHANNEL as string,
    })
    this.payment = new stripe(process.env.STRIPE_SECRET_KEY as string)
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

  async handleCheckoutComplete(session: stripe.Checkout.Session) {
    const { metadata } = session

    if (!metadata) {
      return
    }

    const orderId = session.metadata?.order_id
    const lineUserId = session.metadata?.line_id

    if (!orderId) {
      return
    }

    const order = await this.db.pos_order.findFirst({
      where: {
        id: Number(orderId),
      },
      include: {
        pos_order_line: true,
      },
    })

    if (!order) {
      return
    }

    const phoneNumber = this.parseCustomerNote(order.pos_order_line[0].customer_note as string)["Phone Number"]


    const orderDoing = createOrderDoing({
      menuName: order.pos_order_line[0].full_product_name as string,
      orderId: order.id,
      phoneNumber,
    })

    await this.client.pushMessage({
      to: lineUserId as string,
      messages: [
        {
          type: 'flex',
          altText: 'Bash - Menu Detail',
          contents: orderDoing,
        },
      ],
    })
  }
}
