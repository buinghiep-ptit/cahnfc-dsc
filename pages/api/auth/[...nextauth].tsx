/* eslint-disable @typescript-eslint/no-unused-expressions */
import { login } from '@/api-client'
import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth, {
  NextAuthOptions,
  Session,
  SessionStrategy,
  User,
} from 'next-auth'
import { JWT } from 'next-auth/jwt'
import CredentialsProvider from 'next-auth/providers/credentials'
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
const nextAuthOptions = (req: NextApiRequest, res: NextApiResponse) => {
  return {
    providers: [
      FacebookProvider({
        clientId: process.env.FACEBOOK_CLIENT_ID as string,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
      }),
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        authorization: {
          params: {
            prompt: 'consent',
            access_type: 'offline',
            response_type: 'code',
          },
        },
      }),
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
          const tokenUser = await login(payload)
          // const cookies = response.headers["set-cookie"];

          // res.setHeader("Set-Cookie", cookies);
          return tokenUser
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
      signIn: async ({
        user,
        account,
        profile,
        credentials,
      }: Record<string, unknown>) => {
        return true
      },
      register: async ({
        firstName,
        lastName,
        email,
        password,
      }: Record<string, string>) => {},
      jwt: async ({
        token,
        user,
      }: {
        token: JWT
        user?: User & Record<'accessToken', string>
      }) => {
        token && console.log('token:', token)
        user && (token = { ...token, ...user })

        return token
      },
      session: async ({
        session,
        token,
      }: {
        session: Session & { accessToken?: string }
        token: JWT
      }) => {
        // console.log('token:', token)
        session = { ...token } as Session
        console.log('session:', session)

        return session
      },
    },
  }
}
export default (req: NextApiRequest, res: NextApiResponse) => {
  return NextAuth(req, res, nextAuthOptions(req, res) as NextAuthOptions)
}
