import {
  FlexComponent,
  FlexContainer,
} from '@line/bot-sdk/dist/messaging-api/api'
import { bakeryMenus, jellyMenus, oatMilkMenus } from './EligibleMenus'

interface MenuDetailProps {
  name: string
  price: string
  description: string
  imageUrl: string
  sweetness: string
  addOns: { name: string; price: number }[]
}

export const createMenuDetail = ({
  name,
  price,
  description,
  imageUrl,
  sweetness,
  addOns,
}: MenuDetailProps): FlexContainer => {
  const addOnComponent: FlexComponent[] = []
  const isShowSweetness = !bakeryMenus.some(bakery => name.includes(bakery))

  if (oatMilkMenus.some(oat => name.includes(oat))) {
    addOnComponent.push({
      type: 'box',
      layout: 'baseline',
      contents: [
        {
          type: 'text',
          text: '- Oat Milk',
        },
        {
          type: 'text',
          text: '฿15',
          size: 'sm',
          offsetBottom: 'sm',
          color: '#A2A3A3',
          align: 'end',
        },
      ],
      spacing: 'md',
    })
  }

  if (jellyMenus.some(jelly => name.includes(jelly))) {
    addOnComponent.push({
      type: 'box',
      layout: 'baseline',
      contents: [
        {
          type: 'text',
          text: '- Brown Sugar Jelly',
          position: 'absolute',
        },
        {
          type: 'text',
          text: '฿10',
          size: 'sm',
          offsetBottom: 'sm',
          color: '#A2A3A3',
          align: 'end',
        },
      ],
      spacing: 'md',
    })
  }

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
          contents: isShowSweetness
            ? [
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
              ]
            : [],
          margin: 'md',
          spacing: 'sm',
        },
        {
          type: 'text',
          text: 'Add-ons',
          weight: 'bold',
        },
        {
          type: 'box',
          layout: 'vertical',
          contents: addOnComponent,
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
            data: JSON.stringify({
              state: 'goto_confirm',
              menu: name,
              price,
              sweetness,
              addOns,
            }),
            displayText: `Menu - ${name}`,
          },
        },
      ],
      spacing: 'none',
    },
  }
}
