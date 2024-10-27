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
  const receiptNo = receiptNumber.split('-');
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
          text: `NO. ${receiptNo.length > 1 ? receiptNo[1] : 'N/A'}`,
          weight: 'bold',
          size: 'xxl',
          margin: 'md',
        },
        {
          type: 'text',
          text: `Delivery: ${deliveryMethod}`,
          size: 'xs',
          color: '#aaaaaa',
          wrap: true,
        },
        {
          type: 'text',
          text: `Phone number: ${phoneNumber}`,
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
          contents: items.map(item => ({
            type: 'box',
            layout: 'vertical',
            contents: [
              {
                type: 'box',
                layout: 'horizontal',
                contents: [
                  {
                    type: 'text',
                    text: item.name,
                    size: 'sm',
                    color: '#555555',
                    flex: 0,
                  },
                  {
                    type: 'text',
                    text: `${item.price} THB`,
                    size: 'sm',
                    color: '#111111',
                    align: 'end',
                  },
                ],
              },
              {
                type: 'box',
                layout: 'vertical',
                contents: [
                  item.sweetness && {
                    type: 'text',
                    text: `- ${item.sweetness}%`,
                    size: 'xs',
                  },
                  ...(item.addOns?.map((addOn) => ({
                    type: 'text',
                    text: `- ${addOn}`,
                    size: 'xs',
                  })) ?? []),
                ].filter(Boolean),
                paddingStart: 'md',
                margin: 'sm',
              },
            ],
          })),
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
              text: `${totalItems}`,
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
              text: `${totalPrice} THB`,
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
              url: qrUrl,
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
            data: 'saveqr',
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
