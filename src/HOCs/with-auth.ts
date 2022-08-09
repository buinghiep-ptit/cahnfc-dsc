import { GetServerSidePropsContext, Redirect } from 'next'
import { getSession } from 'next-auth/react'

export const withAuth = (options: WrapperOptions) => (gssp: any) => {
  return async (context: GetServerSidePropsContext) => {
    const session = await getSession(context)
    const domain = context.req.headers.host
    const pathName = 'https://' + domain + context.resolvedUrl

    if (options.isProtected && !session) {
      return {
        redirect: {
          destination: `/login?next=${encodeURIComponent(pathName)}`,
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
