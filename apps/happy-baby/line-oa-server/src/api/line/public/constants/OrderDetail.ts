import {
  FlexContainer,
  FlexComponent,
} from '@line/bot-sdk/dist/messaging-api/api'

interface ConfirmOrderProps {
  id: number
  name: string
  selectedAddOns: string[]
  sweetness: number
  price: number
}

export const createOrderDetail = ({
  id,
  name,
  selectedAddOns,
  sweetness,
  price,
}: ConfirmOrderProps): FlexContainer => {
  const addOns = []

  if (sweetness) {
    addOns.push({
      type: 'text',
      text: `- sweetness: ${sweetness}%`,
      size: 'xs',
    })
  }

  selectedAddOns.forEach(addOn => {
    addOns.push({
      type: 'text',
      text: `- add-on: ${addOn}`,
      size: 'xs',
    })
  })

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
          text: `NO. ${id}`,
          weight: 'bold',
          size: 'xxl',
          margin: 'md',
        },
        {
          type: 'text',
          text: 'Bash Coffee, Mahidol University',
          size: 'xs',
          color: '#aaaaaa',
          wrap: true,
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
          contents: [
            {
              type: 'box',
              layout: 'vertical',
              contents: [
                {
                  type: 'box',
                  layout: 'horizontal',
                  contents: [
                    {
                      type: 'text',
                      text: name,
                      size: 'sm',
                      color: '#555555',
                      flex: 0,
                    },
                    {
                      type: 'text',
                      text: `${price} THB`,
                      size: 'sm',
                      color: '#111111',
                      align: 'end',
                      weight: 'regular',
                    },
                  ],
                },
                {
                  type: 'box',
                  layout: 'vertical',
                  // {
                  contents: addOns as FlexComponent[],
                  paddingStart: 'md',
                  margin: 'sm',
                },
              ],
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
                  text: '1',
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
                  text: `${price} THB`,
                  size: 'sm',
                  color: '#111111',
                  align: 'end',
                  weight: 'bold',
                },
              ],
              paddingBottom: 'xl',
            },
          ],
        },
        {
          type: 'button',
          action: {
            type: 'postback',
            label: 'Confirm order',
            data: JSON.stringify({
              menu: name,
              price: price,
              sweetness: sweetness,
              selectedAddOns: selectedAddOns,
              state: 'goto_delivery_address',
            }),
          },
          style: 'primary',
          offsetTop: 'sm',
          color: '#4F3A32',
          offsetBottom: 'none',
        },
      ],
    },
    styles: {
      footer: {
        separator: true,
      },
    },
  }
}
