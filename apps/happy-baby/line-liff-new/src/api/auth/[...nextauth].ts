import { NextApiRequest, NextApiResponse } from 'next'
// import NextAuth, { NextAuthOptions } from 'next-auth'
import { NextAuthOptions } from 'next-auth'
import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'

import { getMe, login, verifyPhoneNumber } from '@/service/auth'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Phone Number',
      credentials: {
        phoneNumber: {
          label: 'Phone Number',
          type: 'text',
          placeholder: 'xxx-xxx-xxxx',
        },
        verificationCode: { label: 'Verification Code', type: 'text' },
      },
      async authorize(credentials) {
        if (!credentials?.phoneNumber || !credentials?.verificationCode) {
          return null
        }

        const verifyResponse = await verifyPhoneNumber(
          credentials.phoneNumber,
          credentials.verificationCode,
        )

        if (verifyResponse.statusCode === 200) {
          const res = await login({ phoneNumber: credentials.phoneNumber })

          const token = res
          const userRes = await getMe(token)

          return {
            id: userRes.id,
            email: userRes.email,
            firstname: userRes.firstname,
            lastname: userRes.lastname,
            points: userRes.points,
            phoneNumber: userRes.phoneNumber,
            token,
          }
        }

        return null
      },
    }),
  ],
  pages: {
    signIn: '/signin',
  },
  session: {
    strategy: 'jwt',
  },
}

// eslint-disable-next-line require-await
const Auth = async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('cache-control', 'no-store, max-age=0')

  return NextAuth(req, res, authOptions)
}

export default Auth