import { withAuth } from '@/HOCs'
import { GetServerSidePropsContext } from 'next'
import { Session } from 'next-auth'
import { useSession } from 'next-auth/react'

const Server = () => {
  const { data: session } = useSession()

  return (
    <div>
      <h1>Server page</h1>
      <strong>Signed in as</strong>:{' '}
      <mark>{(session as Session & Record<string, string>).accessToken}</mark>
    </div>
  )
}
export const getServerSideProps = withAuth({
  isProtected: false,
})((context: GetServerSidePropsContext) => {
  // Your normal `getServerSideProps` code here
  return { props: {} }
})

export default Server
