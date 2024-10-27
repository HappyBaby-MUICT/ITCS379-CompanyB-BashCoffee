import { FlexContainer } from "@line/bot-sdk/dist/messaging-api/api"

export const SweetnessLevel = (menu: string, selectedAddOns: string[] = []): FlexContainer => {
  return {
    type: 'bubble',
    size: 'giga',
    header: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'text',
          text: 'Select Sweetness Level!',
          align: 'center',
        },
      ],
    },
    body: {
      type: 'box',
      layout: 'horizontal',
      contents: [
        {
          type: 'box',
          layout: 'vertical',
          contents: [
            {
              type: 'text',
              text: '100%',
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
            label: 'sweetlevel',
            data: JSON.stringify({
              state: 'goto_checkout',
              menu,
              selectedAddOns,
              sweetness: 100,
            }),
            displayText: 'sweetness level: 100%',
          },
        },
        {
          type: 'box',
          layout: 'vertical',
          contents: [
            {
              type: 'text',
              text: '75%',
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
            label: 'sweetlevel',
            data: JSON.stringify({
              state: 'goto_checkout',
              menu,
              selectedAddOns,
              sweetness: 75,
            }),
            displayText: 'sweetness level: 75%',
          },
        },
        {
          type: 'box',
          layout: 'vertical',
          contents: [
            {
              type: 'text',
              text: '50%',
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
            label: 'sweetlevel',
            data: JSON.stringify({
              state: 'goto_checkout',
              menu,
              selectedAddOns,
              sweetness: 50,
            }),
            displayText: 'sweetness level: 50%',
          },
        },
        {
          type: 'box',
          layout: 'vertical',
          contents: [
            {
              type: 'text',
              text: '25%',
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
            label: 'sweetlevel',
            data: JSON.stringify({
              state: 'goto_checkout',
              menu,
              selectedAddOns,
              sweetness: 25,
            }),
            displayText: 'sweetness level: 25%',
          },
        },
        {
          type: 'box',
          layout: 'vertical',
          contents: [
            {
              type: 'text',
              text: '0%',
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
            label: 'sweetlevel',
            data: JSON.stringify({
              state: 'goto_checkout',
              menu,
              selectedAddOns,
              sweetness: 0,
            }),
            displayText: 'sweetness level: 0%',
          },
        },
      ],
      spacing: 'md',
    },
  }
}
