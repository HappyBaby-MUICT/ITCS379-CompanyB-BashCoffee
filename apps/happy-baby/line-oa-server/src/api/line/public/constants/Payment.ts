import {
  FlexContainer,
  FlexComponent,
} from '@line/bot-sdk/dist/messaging-api/api'

interface PaymentProps {
  receiptNumber: string
  deliveryMethod: string
  phoneNumber: string
  items: {
    name: string
    price: number
    sweetness?: string
    addOns?: string[]
    note?: string
  }[]
  totalItems: number
  totalPrice: number
  qrUrl: string
}

export const createPaymentMessage = ({
  receiptNumber,
  deliveryMethod,
  phoneNumber,
  items,
  totalItems,
  totalPrice,
  qrUrl,
}: PaymentProps) => {
  return {
    type: 'bubble',
    body: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'text',
          text: 'RECEIPT',
          weight: 'bold',
          color: '#9B7C53',
          size: 'sm',
        },
        {
          type: 'text',
          text: `NO. ${receiptNumber || 'N/A'}`,
          weight: 'bold',
          size: 'xxl',
          margin: 'md',
        },
        {
          type: 'text',
          text: `Delivery: ${deliveryMethod || 'N/A'}`,
          size: 'xs',
          color: '#aaaaaa',
          wrap: true,
        },
        {
          type: 'text',
          text: `Phone number: ${phoneNumber || 'N/A'}`,
          size: 'xs',
          color: '#aaaaaa',
          wrap: true,
          margin: 'sm',
        },
        {
          type: 'separator',
          margin: 'xxl',
        },
        {
          type: 'box',
          layout: 'vertical',
          margin: 'xxl',
          spacing: 'sm',
          contents: items.map(item => {
            const addOnsContent = (item.addOns ?? []).map(addOn => ({
              type: 'text',
              text: '' + addOn || '',
              size: 'xs',
            }))

            const sweetnessText = item.sweetness
              ? {
                  type: 'text',
                  text: `- sweetness: ${item.sweetness}%`,
                  size: 'xs',
                }
              : null

            return {
              type: 'box',
              layout: 'vertical',
              contents: [
                {
                  type: 'box',
                  layout: 'horizontal',
                  contents: [
                    {
                      type: 'text',
                      text: item.name || 'N/A', // Add default value
                      size: 'sm',
                      color: '#555555',
                      flex: 0,
                    },
                    {
                      type: 'text',
                      text: `${item.price || 0} THB`, // Add default value
                      size: 'sm',
                      color: '#111111',
                      align: 'end',
                    },
                  ],
                },
                {
                  type: 'box',
                  layout: 'vertical',
                  contents: [sweetnessText, ...addOnsContent].filter(Boolean), // Filter out null values
                  paddingStart: 'md',
                  margin: 'sm',
                },
              ],
            }
          }),
        },
        {
          type: 'separator',
          margin: 'xxl',
        },
        {
          type: 'box',
          layout: 'horizontal',
          margin: 'xxl',
          contents: [
            {
              type: 'text',
              text: 'ITEMS',
              size: 'sm',
              color: '#555555',
            },
            {
              type: 'text',
              text: `${totalItems || 0}`, // Add default value
              size: 'sm',
              color: '#111111',
              align: 'end',
              weight: 'bold',
            },
          ],
        },
        {
          type: 'box',
          layout: 'horizontal',
          contents: [
            {
              type: 'text',
              text: 'TOTAL',
              size: 'sm',
              color: '#555555',
            },
            {
              type: 'text',
              text: `${totalPrice || 0} THB`, // Add default value
              size: 'sm',
              color: '#111111',
              align: 'end',
              weight: 'bold',
            },
          ],
          paddingBottom: 'xl',
        },
        {
          type: 'box',
          layout: 'vertical',
          margin: 'xxl',
          contents: [
            {
              type: 'image',
              url: qrUrl || 'https://placehold.jp/150x150.png',
              aspectMode: 'cover',
              size: 'xl',
              margin: 'md',
            },
            {
              type: 'text',
              text: 'Scan or save the PromptPay QR to pay your order',
              color: '#aaaaaa',
              wrap: true,
              margin: 'md',
              size: 'xs',
              align: 'center',
            },
          ],
          spacing: 'lg',
          justifyContent: 'center',
          alignItems: 'center',
        },
        {
          type: 'button',
          action: {
            type: 'postback',
            label: 'Save QR',
            data: JSON.stringify({
              state: 'jump_success',
            }),
          },
          style: 'primary',
          color: '#4F3A32',
          margin: 'md',
        },
      ],
    },
    styles: {
      footer: {
        separator: true,
      },
    },
  } as FlexContainer
}
