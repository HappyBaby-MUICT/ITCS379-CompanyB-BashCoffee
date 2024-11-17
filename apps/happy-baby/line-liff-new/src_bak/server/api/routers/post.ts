import { env } from '@/env'
import { createTRPCRouter, publicProcedure } from '@/server/api/trpc'

import { InquiryArgs } from './type'

export const postRouter = createTRPCRouter({
  inquiry: publicProcedure.input(InquiryArgs).mutation(async ({ input }) => {
    const message = `
      New Inquiry Received:
      Full Name: ${input.fullName}
      Email: ${input.email}
      Phone: ${input.phone}
      Company Name: ${input.companyName}
      Package Name: ${input.packageName}
      Corporate Type: ${input.corporateType}
      Available Hours: ${input.availableHours.toString()}
      Message: ${input.message}
    `

    const response = await fetch('https://notify-api.line.me/api/notify', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.LINE_NOTIFY_TOKEN}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ message }),
    })

    if (!response.ok) {
      throw new Error('Failed to send notification')
    }

    return { success: true }
  }),
})
