import { withAuth } from 'next-auth/middleware'

export default withAuth({
  callbacks: {
    authorized({ token }) {
      return !!token
    },
  },
  pages: {
    signIn: `${process.env.NEXTAUTH_URL}/auth/signin`,
  },
})

export const config = {
  matcher: ['/profile/:page*'],
}
