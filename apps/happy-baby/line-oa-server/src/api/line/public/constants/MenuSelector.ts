import { FlexBox, FlexContainer } from '@line/bot-sdk/dist/messaging-api/api'

const generateMenuItems = (
  menus: { name: string; list_price: number }[],
): FlexBox[] => {
  return menus.map(menu => ({
    type: 'box',
    layout: 'vertical',
    contents: [
      {
        type: 'image',
        url: 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png',
        size: 'md',
        align: 'center',
        aspectMode: 'cover',
        margin: 'none',
      },
      {
        type: 'text',
        text: JSON.parse(menu.name).en_US,
        align: 'center',
        size: 'sm',
        wrap: true,
      },
    ],
    spacing: 'md',
    action: {
      type: 'postback',
      label: 'DrinkMenu',
      data: JSON.stringify({
        menu: JSON.parse(menu.name).en_US,
        state: 'order',
      }),
      displayText: `Drink - ${JSON.parse(menu.name).en_US}`,
    },
  }))
}

export const createMenuSelector = (
  menus: { name: string; list_price: number }[],
): FlexContainer => ({
  type: 'bubble',
  size: 'giga',
  direction: 'ltr',
  header: {
    type: 'box',
    layout: 'vertical',
    contents: [
      {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'text',
            text: 'Coffee Menu',
            color: '#D5CBB1',
            weight: 'bold',
            align: 'center',
            size: 'md',
          },
        ],
        backgroundColor: '#4F3A32',
        alignItems: 'center',
        paddingStart: 'xl',
        paddingTop: 'lg',
        paddingBottom: 'lg',
        justifyContent: 'center',
      },
    ],
  },
  body: {
    type: 'box',
    layout: 'vertical',
    contents: [
      {
        type: 'box',
        layout: 'horizontal',
        contents: generateMenuItems(menus.slice(0, 3)),
      },
      {
        type: 'box',
        layout: 'horizontal',
        contents: generateMenuItems(menus.slice(3, 6)),
      },
    ],
    spacing: 'lg',
  },
  styles: {
    header: {
      separator: false,
    },
  },
})
