/* eslint-disable @typescript-eslint/no-unused-expressions */
import { loginUser, renewToken } from '@/api-client'
import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth, {
  NextAuthOptions,
  RequestInternal,
  Session,
  SessionStrategy,
  User,
} from 'next-auth'
import { JWT } from 'next-auth/jwt'
import CredentialsProvider from 'next-auth/providers/credentials'
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'
import AppleProvider from 'next-auth/providers/apple'

const refreshAccessToken = async (
  payload: { refreshToken: string; deviceId: string } & Record<string, string>,
): Promise<JWT> => {
  try {
    // Get a new set of tokens with a refreshToken
    const tokenResponse = await renewToken(payload)

    return {
      ...payload,
      accessToken: tokenResponse.accessToken,
      expiredIn: tokenResponse.expiredIn,
      refreshToken: tokenResponse.refreshToken,
    }
  } catch (error) {
    return {
      ...payload,
      error: 'RefreshAccessTokenError' || error,
    }
  }
}
// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
const nextAuthOptions = (req: NextApiRequest, res: NextApiResponse) => {
  return {
    providers: [
      FacebookProvider({
        clientId: process.env.FACEBOOK_CLIENT_ID as string,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
        userinfo: {
          params: {
            fields:
              'id,email,first_name,last_name,birthday,picture{is_silhouette,url}',
          },
        },
        profile(profile: any) {
          return {
            ...profile,
            firstName: profile.first_name,
            lastName: profile.last_name,
            is_silhouette: profile.picture.data.is_silhouette,
            image: profile.picture.data.url,
          }
        },
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
      AppleProvider({
        clientId: process.env.APPLE_CLIENT_ID as string,
        clientSecret: process.env.APPLE_CLIENT_SECRET as string,
      }),
      CredentialsProvider({
        type: 'credentials',
        credentials: {
          email: { label: 'Email', type: 'text' },
          password: { label: 'Password', type: 'password' },
        },
        authorize: async (credentials, _req) => {
          const payload = {
            email: credentials!.email,
            password: credentials!.password,
          }
          try {
            const user = await loginUser({ ...payload, rememberMe: false })
            if ((user as any).accessToken) {
              return user
            }

            return null
          } catch (error) {
            throw new Error(`${error}`)
          }
          // const cookies = response.headers["set-cookie"];
          // res.setHeader("Set-Cookie", cookies);
        },
      }),
    ],
    // refetchInterval: 1 * 24 * 60 * 60,
    secret: process.env.SECRET,
    debug: true,
    session: {
      strategy: 'jwt' as SessionStrategy,
      maxAge: 1 * 60,
    },
    jwt: {
      maxAge: 1 * 60,
    },
    pages: {
      signIn: '/auth/signin',
      signOut: '/auth/signout',
      error: '/auth/error', // Error code passed in query string as ?error=
    },
    callbacks: {
      signIn: async ({
        user,
        account,
        profile,
        credentials,
      }: Record<string, unknown>) => {
        if (account) {
          // token.accessToken = account.access_token
          // console.log('account signIn:', account)
        }

        return true
      },
      async redirect({ url, baseUrl }: any) {
        // Allows relative callback URLs
        if (url.startsWith('/')) return `${baseUrl}${url}`
        // Allows callback URLs on the same origin
        else if (new URL(url).origin === baseUrl) return url
        return baseUrl
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
        account,
      }: {
        token: JWT
        user?: User
        account?: any
      }) => {
        console.log('acc:', account)
        console.log('user:', user)

        if (user && account) {
          token.accessToken = user.accessToken
          // token.expiredAt = user.expiredAt
          // token.refreshToken = user.refreshToken || null
          token = { ...token, ...user }
        }

        if (account && account.access_token) {
          // token = { ...token, ...account }
          token.accessToken = account.access_token
          //get token our services replace for social auth service here
        }

        const shouldRefreshTime = Math.round(
          (token.expiredAt as number) - 30 * 60 * 1000 - Date.now(), // 30 minutes
        )
        if (shouldRefreshTime > 0) return token

        if (token.refreshToken) {
          token = (await refreshAccessToken({
            refreshToken: token.refreshToken as string,
            deviceId: 'XXX-XX-XXX',
          })) as JWT & Record<string, string>
        }

        return token
      },
      session: async ({ session, token }: { session: Session; token: JWT }) => {
        session = { ...session, ...token } as Session

        return session
      },
    },
  }
}
export default (req: NextApiRequest, res: NextApiResponse) => {
  return NextAuth(req, res, nextAuthOptions(req, res) as NextAuthOptions)
}
