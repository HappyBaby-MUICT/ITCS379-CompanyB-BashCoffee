import * as line from '@line/bot-sdk'
import express from 'express'

const config = {
  channelSecret: process.env.CHANNEL_SECRET,
}

const client = new line.messagingApi.MessagingApiClient({
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
})

const app = express()

app.post('/callback', line.middleware(config), (req, res) => {
  Promise.all(req.body.events.map(handleEvent))
    .then(result => res.json(result))
    .catch(err => {
      console.error(err)
      res.status(500).end()
    })
})

// // event handler
// function handleEvent(event) {
//   if (event.type !== 'message' || event.message.type !== 'text') {
//     // ignore non-text-message events
//     return Promise.resolve(null)
//   }

//   // Define the quick reply options
//   const quickReplyOptions = {
//     quickReply: {
//       items: [
//         {
//           type: 'action',
//           action: {
//             type: 'message',
//             label: 'Operating Hours',
//             text: 'Operating Hours',
//           },
//         },
//         {
//           type: 'action',
//           action: {
//             type: 'message',
//             label: 'Location',
//             text: 'Location & Directions',
//           },
//         },
//         {
//           type: 'action',
//           action: {
//             type: 'message',
//             label: 'Contact Staff',
//             text: 'Contact Staff',
//           },
//         },
//       ],
//     },
//   }

//   // Check user input and respond accordingly
//   let message
//   switch (event.message.text) {
//     case 'Operating Hours':
//       message = {
//         type: 'text',
//         text: 'ร้าน BASH Coffee เปิดตั้งแต่ 8 โมงเช้า ถึง 6 โมงเย็น',
//         ...quickReplyOptions,
//       }
//       break
//     case 'Location':
//       message = {
//         type: 'text',
//         text: 'ร้านตั้งอยู่ที่หน้าคณะ ICT มหาวิทยาลัยมหิดล',
//         ...quickReplyOptions,
//       }
//       break
//     case 'Contact Staff':
//       message = {
//         type: 'text',
//         text: 'สามารถติดต่อทางร้านได้ที่เบอร์ 0912345678',
//         ...quickReplyOptions,
//       }
//       break
//     default:
//       message = {
//         type: 'text',
//         text: 'ยินดีต้อนรับสู่ BASH Coffee',
//         ...quickReplyOptions,
//       }
//       break
//   }

//   // Send the reply with quick replies
//   return client.replyMessage({
//     replyToken: event.replyToken,
//     messages: [message],
//   })
// }

// Main quick reply options (FAQ and Contact Staff)
const mainMenuQuickReply = {
  quickReply: {
    items: [
      {
        type: 'action',
        action: {
          type: 'postback',
          label: 'FAQ',
          data: 'action=faq',
        },
      },
      {
        type: 'action',
        action: {
          type: 'postback',
          label: 'Contact Staff',
          data: 'action=contact_staff',
        },
      },
    ],
  },
}

// FAQ submenu options (Recommended Menu, Operating Hours, Location, Back to Main Menu)
const faqQuickReply = {
  quickReply: {
    items: [
      {
        type: 'action',
        action: {
          type: 'postback',
          label: 'Recommended Menu',
          data: 'action=recommended_menu',
        },
      },
      {
        type: 'action',
        action: {
          type: 'postback',
          label: 'Operating Hours',
          data: 'action=operating_hours',
        },
      },
      {
        type: 'action',
        action: {
          type: 'postback',
          label: 'Location',
          data: 'action=location',
        },
      },
    ],
  },
}

// Event handler
async function handleEvent(event) {
  if (event.type === 'follow') {
    const welcomeMessage = {
      type: 'text',
      text: 'ยินดีต้อนรับสู่ BASH Coffee!',
      ...mainMenuQuickReply,
    }

    return client.replyMessage({
      replyToken: event.replyToken,
      messages: [welcomeMessage],
    })
  }

  if (event.type === 'postback') {
    let message
    switch (event.postback.data) {
      case 'action=faq':
        message = {
          type: 'text',
          text: 'Please select from the following options:',
          ...faqQuickReply,
        }
        break
      case 'action=contact_staff':
        message = {
          type: 'text',
          text: 'You can contact us at 0912345678.',
          ...mainMenuQuickReply,
        }
        break
      case 'action=recommended_menu':
        message = {
          type: 'text',
          text: 'Our recommended menu items are Espresso, Cappuccino, and Latte.',
          ...mainMenuQuickReply,
        }
        break
      case 'action=operating_hours':
        message = {
          type: 'text',
          text: 'BASH Coffee is open from 8 AM to 6 PM.',
          ...mainMenuQuickReply,
        }
        break
      case 'action=location':
        message = {
          type: 'text',
          text: 'We are located in front of the ICT Faculty, Mahidol University.',
          ...mainMenuQuickReply,
        }
        break
      default:
        message = {
          type: 'text',
          text: 'Welcome back to BASH Coffee! How can I assist you today?',
          ...mainMenuQuickReply,
        }
        break
    }

    return client.replyMessage({
      replyToken: event.replyToken,
      messages: [message],
    })
  }
  // Handle text messages by forwarding them to the chatbot
  if (event.type === 'message' && event.message.type === 'text') {
    try {
      const chatbotResponse = await handleChatBot({
        question: event.message.text,
      })
      const replyMessage = {
        type: 'text',
        text: chatbotResponse['text'],
        ...mainMenuQuickReply, // Add main menu quick replies to chatbot responses
      }

      return client.replyMessage({
        replyToken: event.replyToken,
        messages: [replyMessage],
      })
    } catch (error) {
      console.error('Error in handleChatBot:', error)
      return client.replyMessage(event.replyToken, [
        {
          type: 'text',
          text: 'Sorry, I encountered an error. Please try again later.',
          ...mainMenuQuickReply,
        },
      ])
    }
  }
}

async function handleChatBot(lineMessage) {
  const response = await fetch(
    'http://localhost:15542/api/v1/prediction/89fb4948-d9c1-4fed-bd48-76b6708bd6e5',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(lineMessage),
    },
  )
  const result = await response.json()
  return result
}

const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
