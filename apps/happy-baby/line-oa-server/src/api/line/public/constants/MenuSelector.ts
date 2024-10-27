import {
  FlexBox,
  FlexBubble,
  FlexContainer,
  FlexMessage,
  TemplateMessage,
} from '@line/bot-sdk/dist/messaging-api/api'

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
        price: menu.list_price,
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

export const addOnConfirmMessage = (
  menu: string,
  selectedAddOns: string[] = [],
): FlexBubble => {
  return {
    type: 'bubble',
    size: 'giga',
    header: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'text',
          text: 'Do you want add-on?',
          align: 'center',
        },
      ],
    },
    body: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'box',
          layout: 'vertical',
          contents: [
            {
              type: 'text',
              text: 'Oat Milk - ฿15',
            },
          ],
          borderWidth: 'light',
          borderColor: '#747476',
          alignItems: 'center',
          paddingTop: 'sm',
          paddingBottom: 'sm',
          cornerRadius: 'md',
          action: {
            type: 'postback',
            label: 'oatmilk',
            data: JSON.stringify({
              state: 'add_on_yes',
              addOn: 'Oat Milk',
              menu,
              selectedAddOns,
            }),
            displayText: 'Add-On: Oat Milk',
          },
        },
        {
          type: 'box',
          layout: 'vertical',
          contents: [
            {
              type: 'text',
              text: 'Brown Sugar Jelly - ฿10',
            },
          ],
          borderWidth: 'light',
          borderColor: '#747476',
          alignItems: 'center',
          paddingTop: 'sm',
          paddingBottom: 'sm',
          cornerRadius: 'md',
          action: {
            type: 'postback',
            label: 'jelly',
            data: JSON.stringify({
              state: 'add_on_yes',
              addOn: 'Brown Sugar Jelly',
              menu,
              selectedAddOns,
            }),
            displayText: 'Add-On: Brown Sugar Jelly',
          },
        },
        {
          type: 'box',
          layout: 'vertical',
          contents: [
            {
              type: 'text',
              text: 'No, thanks!',
            },
          ],
          borderWidth: 'light',
          borderColor: '#747476',
          alignItems: 'center',
          paddingTop: 'sm',
          paddingBottom: 'sm',
          cornerRadius: 'md',
          action: {
            type: 'postback',
            label: 'no-addon',
            data: JSON.stringify({
              state: 'sweetness_select',
              menu,
              selectedAddOns,
            }),
            displayText: 'No, thanks!',
          },
        },
      ],
      spacing: 'md',
    },
  }
}
