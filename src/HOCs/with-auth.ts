import { GetServerSidePropsContext, Redirect } from 'next'
import { getSession } from 'next-auth/react'
const isProd = process.env.NODE_ENV === 'production'

export const withAuth = (options: WrapperOptions) => (gssp: any) => {
  return async (context: GetServerSidePropsContext) => {
    const { req, resolvedUrl } = context
    const session = await getSession(context || { req })
    const domain = req.headers.host
    const destination = isProd ? 'https://' : 'http://' + domain + resolvedUrl
    const callbackUrl = `/login?next=${encodeURIComponent(destination)}`

    if (options.isProtected && !session) {
      return {
        redirect: {
          destination: callbackUrl,
          permanent: false,
          ...options.redirect,
        },
      }
    }
    const gsspData = await gssp(context) // Run `getServerSideProps` to get page-specific data
    // Pass page-specific props along with user data from `withAuth` to component
    return {
      props: {
        ...gsspData.props,
        session,
      },
    }
  }
}

export type WrapperOptions =
  | { isProtected: false }
  | { isProtected: true; redirect?: Redirect }
