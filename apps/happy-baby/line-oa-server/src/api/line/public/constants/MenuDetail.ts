import { FlexComponent, FlexContainer } from '@line/bot-sdk/dist/messaging-api/api'

interface MenuDetailProps {
  name: string
  price: string
  description: string
  imageUrl: string
  addOns: { name: string; price: number }[]
}

export const createMenuDetail = ({
  name,
  price,
  description,
  imageUrl,
  addOns,
}: MenuDetailProps): FlexContainer => {
  return {
    type: 'bubble',
    hero: {
      type: 'image',
      url: imageUrl,
      size: 'full',
      aspectRatio: '20:13',
      aspectMode: 'cover',
      action: {
        type: 'uri',
        uri: imageUrl,
      },
    },
    body: {
      type: 'box',
      layout: 'vertical',
      spacing: 'xs',
      action: {
        type: 'uri',
        uri: 'https://line.me/',
      },
      contents: [
        {
          type: 'text',
          text: name,
          size: 'xl',
          weight: 'bold',
        },
        {
          type: 'text',
          text: `${price} Baht`,
          size: 'sm',
          color: '#9B7C53',
          margin: 'md',
        },
        {
          type: 'text',
          text: description,
          size: 'sm',
          color: '#A2A3A3',
          margin: 'md',
        },
        {
          type: 'box',
          layout: 'vertical',
          contents: [
            {
              type: 'text',
              text: 'Sweetness level',
              weight: 'bold',
            },
            {
              type: 'text',
              text: '0%-100%',
              size: 'sm',
            },
          ],
          margin: 'md',
          spacing: 'sm',
        },
        {
          type: 'box',
          layout: 'vertical',
          contents: [
            {
              type: 'text',
              text: 'Add-on',
              weight: 'bold',
            },
            {
            type: "box",
            layout: "baseline",
            contents: [
              {
                type: "text",
                text: "- Oat Milk"
              },
              {
                type: "text",
                text: "฿15",
                size: "sm",
                offsetBottom: "sm",
                color: "#A2A3A3",
                align: "end"
              }
            ],
            spacing: "md"
          },
          {
            type: "box",
            layout: "baseline",
            contents: [
              {
                type: "text",
                text: "- Brown Sugar Jelly",
                position: "absolute"
              },
              {
                type: "text",
                text: "฿10",
                size: "sm",
                offsetBottom: "sm",
                color: "#A2A3A3",
                align: "end"
              }
            ],
            spacing: "md"
          },
          ],
          margin: 'md',
          spacing: 'sm',
        },
      ],
    },
    footer: {
      type: 'box',
      layout: 'horizontal',
      contents: [
        {
          type: 'button',
          style: 'primary',
          color: '#4F3A32',
          action: {
            type: 'postback',
            label: 'Add to my order',
            data: `AddMenu:${name}`,
            displayText: `Drink: ${name}`,
          },
        },
      ],
      spacing: 'none',
    },
  }
}
