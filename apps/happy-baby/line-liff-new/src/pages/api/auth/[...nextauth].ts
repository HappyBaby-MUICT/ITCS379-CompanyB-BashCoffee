import { NextApiRequest, NextApiResponse } from 'next'
import { DefaultSession, NextAuthOptions, User } from 'next-auth'
import NextAuth from 'next-auth/next'
import Credentials from 'next-auth/providers/credentials'

import { getMe, loginFn } from '@/service/auth'

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: User
  }

  interface User {
    id: string
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
    lineToken: string
    points: number
    accessToken: string
  }
}


const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        phoneNumber: { label: 'Phone Number', type: 'text' },
        otp: { label: 'OTP', type: 'text' },
      },
      authorize: async credentials => {
        if (!credentials) {
          throw new Error('No credentials ')
        }

        const accessToken = await loginFn(credentials)
        const user = (await getMe(accessToken)) as unknown as User

        user.accessToken = accessToken

        return { ...user }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, trigger }) => {
      if (trigger === 'update') {
        const _user = await getMe((token as { accessToken: string}).accessToken)

        return { ...token, ...user, ..._user }
      }

      return { ...token, ...user }
    },
    session: ({ session, token }) => {
      const _token = token as {
        id: string
        firstName: string
        lastName: string
        email: string
        phoneNumber: string
        lineToken: string
        points: number
        accessToken: string
      }

      session.user = _token

      return session
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
}

// eslint-disable-next-line require-await
const auth = async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('cache-control', 'no-store, max-age=0')

  return NextAuth(req, res, authOptions)
}

export default auth
