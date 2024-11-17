import { FlexContainer } from '@line/bot-sdk/dist/messaging-api/api'

interface OrderDoingProps {
  phoneNumber: string
  menuName: string
  orderId: number
}

export const createOrderDoing = ({
  phoneNumber,
  menuName,
  orderId,
}: OrderDoingProps): FlexContainer => {
  return {
    type: 'bubble',
    hero: {
      type: 'image',
      url: 'https://lh3.googleusercontent.com/p/AF1QipMZqyQVcQHT9XQaMPrTmd7hguRIahIVOpSYNywc=s680-w680-h510',
      size: 'full',
      aspectRatio: '20:13',
      aspectMode: 'cover',
    },
    body: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'text',
          text: 'The restaurant is preparing your drinks',
          weight: 'bold',
          size: 'lg',
          wrap: true,
        },
        {
          type: 'text',
          text: menuName,
          size: 'sm',
          color: '#999999',
          margin: 'sm',
        },
        {
          type: 'box',
          layout: 'vertical',
          margin: 'lg',
          spacing: 'sm',
          contents: [
            {
              type: 'box',
              layout: 'horizontal',
              contents: [
                {
                  type: 'text',
                  text: "Order #" + orderId.toString(),
                  size: 'sm',
                  color: '#999999',
                },
                {
                  type: 'text',
                  text: phoneNumber,
                  size: 'sm',
                  color: '#999999',
                },
              ],
            },
          ],
        },
      ],
    },
    footer: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'button',
          style: 'primary',
          color: '#36C800',
          action: {
            type: 'message',
            label: 'View Order Status',
            text: 'View Order Status',
          },
        },
      ],
    },
  }
}
