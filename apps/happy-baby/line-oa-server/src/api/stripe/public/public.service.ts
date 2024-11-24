import { PrismaService } from '@bash-coffee/db'
import { PrismaService as LinePrismaService } from '@bash-coffee/line-db'
import { messagingApi } from '@line/bot-sdk'
import { FlexContainer, Message } from '@line/bot-sdk/dist/messaging-api/api'
import { Injectable } from '@nestjs/common'
import { createOrderDoing } from 'api/line/public/constants/OrderDoing'
import stripe from 'stripe'

@Injectable()
export class StripePublicService {
  private readonly client
  private readonly payment

  constructor(
    private readonly db: PrismaService,
    private readonly lineDb: LinePrismaService,
  ) {
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

    const messages: Message[] = []

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

    const phoneNumber = this.parseCustomerNote(
      order.pos_order_line[0].customer_note as string,
    )['Phone Number']

    const orderDoing = createOrderDoing({
      menuName: order.pos_order_line[0].full_product_name as string,
      orderId: order.id,
      phoneNumber,
    })

    messages.push({
      type: 'flex',
      altText: 'Bash - Menu Detail',
      contents: orderDoing,
    })

    // find if user has member in the line db

    const existMember = await this.lineDb.lineUser.findUnique({
      where: {
        phoneNumber,
      },
    })

    if (existMember) {
      await this.lineDb.$transaction(async tx => {
        await tx.lineUser.update({
          where: {
            phoneNumber,
          },
          data: {
            points: {
              increment: order.pos_order_line.length,
            },
          },
        })
        await tx.transactionHistory.create({
          data: {
            userId: existMember.id,
            amount: order.pos_order_line.length,
            type: 'POINT_INCREMENT',
          },
        })
      })

      messages.push({
        type: 'text',
        text: `You have received ${order.pos_order_line.length} points for this purchase!`,
      })
    }

    await this.client.pushMessage({
      to: lineUserId as string,
      messages,
    })
  }
}
