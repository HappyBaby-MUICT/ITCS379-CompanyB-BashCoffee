import { FlexContainer } from '@line/bot-sdk/dist/messaging-api/api'

export const MenuDetail: FlexContainer = {
  type: 'bubble',
  hero: {
    type: 'image',
    url: 'https://developers-resource.landpress.line.me/fx/img/01_1_cafe.png',
    size: 'full',
    aspectRatio: '20:13',
    aspectMode: 'cover',
    action: {
      type: 'uri',
      uri: 'https://line.me/',
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
        text: 'Latte',
        size: 'xl',
        weight: 'bold',
        offsetBottom: 'none',
      },
      {
        type: 'box',
        layout: 'vertical',
        contents: [],
      },
      {
        type: 'text',
        text: '60 Baht',
        size: 'sm',
        offsetBottom: 'sm',
        color: '#9B7C53',
      },
      {
        type: 'text',
        text: 'Espresso shot with  fresh milk',
        size: 'sm',
        offsetBottom: 'sm',
        color: '#A2A3A3',
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
            text: '0% - 100%',
            size: 'sm',
            offsetBottom: 'none',
          },
        ],
        paddingBottom: 'md',
        paddingTop: 'sm',
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
          },
          {
            type: 'box',
            layout: 'baseline',
            contents: [
              {
                type: 'text',
                text: '- Brown Sugar Jelly',
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
          },
        ],
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
        margin: 'none',
        action: {
          type: 'postback',
          label: 'Add to my order',
          data: 'AddMenu',
          displayText: 'Drink: Latte',
        },
      },
    ],
    spacing: 'none',
    margin: 'none',
  },
}