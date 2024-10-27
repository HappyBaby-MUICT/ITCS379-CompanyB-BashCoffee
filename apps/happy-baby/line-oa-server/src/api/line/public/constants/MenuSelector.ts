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
  return menus.map(menu => {;
    return {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'image',
          url: `https://haishin.selenadia.net/netdeliver/images/line-oa/${JSON.parse(menu.name).en_US.toLowerCase().replace(/ /g, '_')}.png`,
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
      maxWidth: "100px",
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
    }
  })
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
            text: 'Menu',
            color: '#D5CBB1',
            weight: 'bold',
            align: 'center',
            size: 'md',
          },
        ],
        backgroundColor: "#4F3A32",
        alignItems: "center",
        paddingStart: "xl",
        paddingTop: "lg",
        paddingBottom: "lg",
        offsetEnd: "none",
        cornerRadius: "none",
        offsetStart: "none",
        offsetBottom: "none",
        offsetTop: "none",
        justifyContent: "center"
      },
    ],
    margin: "none",
    spacing: "none",
    offsetStart: "none",
    offsetEnd: "none",
    offsetBottom: "none",
    paddingAll: "none",
    paddingTop: "none",
  },
  body: {
    type: 'box',
    layout: 'vertical',
    contents: [
      {
        type: 'box',
        layout: 'horizontal',
        contents: generateMenuItems(menus.slice(0, 3)),
        spacing: "none",
        justifyContent: "space-evenly"
      },
      {
        type: 'box',
        layout: 'horizontal',
        contents: generateMenuItems(menus.slice(3, 6)),
         spacing: "none",
        justifyContent: "space-evenly"
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
