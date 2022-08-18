import { withAuth } from '@/HOCs'
import { PrimaryLayout } from '@/layouts'
import { GetServerSidePropsContext } from 'next'
import { Session } from 'next-auth'
import { useSession } from 'next-auth/react'
import { ReactElement } from 'react'

const Protected = () => {
  const { data: session } = useSession()
  return (
    <div>
      <h1>Protected page</h1>
      <strong>Signed in as</strong>:{' '}
      <mark>{(session as Session & Record<string, string>).accessToken}</mark>
    </div>
  )
}

export const getServerSideProps = withAuth({
  isProtected: true,
})((context: GetServerSidePropsContext) => {
  // Your normal `getServerSideProps` code here
  return { props: {} }
})

export default Protected
Protected.getLayout = function getLayout(page: ReactElement) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}
