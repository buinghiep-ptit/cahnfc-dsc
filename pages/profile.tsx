// import { authApi } from '@/api-client'
import { getProfile } from '@/api-client'
import { GetServerSidePropsContext } from 'next'
import { getSession, useSession } from 'next-auth/react'
import * as React from 'react'

export interface IProfilePageProps {}

export default function ProilePage(props: IProfilePageProps) {
  const { data: session } = useSession()
  console.log('session:', session)

  const getProfileUser = async () => {
    try {
      const res = await getProfile()
      alert(res)
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
export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return {
    props: {
      session: await getSession(ctx),
    },
  }
}
