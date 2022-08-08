/* eslint-disable @typescript-eslint/no-unused-expressions */
import NextAuth, {
  NextAuthOptions,
  Session,
  SessionStrategy,
  User,
} from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { JWT } from 'next-auth/jwt'
import { NextApiRequest, NextApiResponse } from 'next'
import { SessionToken } from 'next-auth/core/lib/cookie'
import { login } from '@/api-client'

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
const nextAuthOptions = (req: NextApiRequest, res: NextApiResponse) => {
  return {
    providers: [
      CredentialsProvider({
        type: 'credentials',
        credentials: {
          email: { label: 'Email', type: 'text' },
          password: { label: 'Password', type: 'password' },
        },
        async authorize(
          credentials: Record<'email' | 'password', string> | undefined,
          request,
        ): Promise<Omit<User, 'id'> | { id?: string | undefined } | null> {
          const payload = {
            username: credentials!.email,
            password: credentials!.password,
          }
          // Add logic here to look up the user from the credentials supplied
          const response = await login(payload)
          // const cookies = response.headers["set-cookie"];

          // res.setHeader("Set-Cookie", cookies);
          return {
            token: response,
          }
        },
      }),
    ],
    // refetchInterval: 1 * 24 * 60 * 60,
    // secret: process.env.NEXTAUTH_SECRET,
    debug: true,
    session: {
      strategy: 'jwt' as SessionStrategy,
      maxAge: 60 * 60,
    },
    jwt: {
      maxAge: 60 * 60,
    },
    callbacks: {
      jwt: async ({ token, user }: { token: JWT; user?: User }) => {
        user && (token.user = user.token)

        return token
      },
      session: async ({
        session,
        token,
      }: {
        session: Session | { user?: any }
        token: JWT
      }) => {
        session.user = token.user
        return session
      },
    },
  }
}
export default (req: NextApiRequest, res: NextApiResponse) => {
  return NextAuth(req, res, nextAuthOptions(req, res) as NextAuthOptions)
}
