// import { authApi } from '@/api-client'
import { getProfile } from '@/api-client'
import { withAuth } from '@/HOCs'
import { GetServerSidePropsContext } from 'next'
import { getSession, useSession } from 'next-auth/react'
import * as React from 'react'

export interface IProfilePageProps {}

export default function ProfilePage(props: IProfilePageProps) {
  const { data: session } = useSession()

  const getProfileUser = async () => {
    try {
      await getProfile()
    } catch (error) {
      alert(error)
    }
  }
  return (
    <div>
      ProtectedPage
      <button onClick={getProfileUser}>get Profile</button>
    </div>
  )
}
// export async function getServerSideProps(ctx: GetServerSidePropsContext) {
//   return {
//     props: {
//       session: await getSession(ctx),
//     },
//   }
// }

export const getServerSideProps = withAuth({
  isProtected: true,
})(async (context: GetServerSidePropsContext) => {
  // Your normal `getServerSideProps` code here
  return {
    props: {
      session: await getSession(context),
    },
  }
})
