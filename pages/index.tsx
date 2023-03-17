/* eslint-disable import/no-named-as-default-member */
import { fetchPosts } from '@/api-client'
import Page from '@/components/page'
import { PrimaryLayout } from '@/layouts'
import { IPost, NextPageWithLayout } from '@/models'
import {
  dehydrate,
  DehydratedState,
  QueryClient,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query'
import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'
import jwt from 'jsonwebtoken'

interface HomeProps {
  posts?: IPost[]
}

const Home: NextPageWithLayout = () => {
  const x = 200

  const router = useRouter()

  const { data }: UseQueryResult<IPost[], Error> = useQuery<IPost[], Error>(
    ['posts'],
    fetchPosts,
  )
  const { data: otherData }: UseQueryResult<IPost[], Error> = useQuery<
    IPost[],
    Error
  >(['posts'], fetchPosts)

  useEffect(() => {
    const privateKey =
      '-----BEGIN PRIVATE KEY-----\nMIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgf0cdzc3hp39tqFSmo4mM+Oxdj+RQnXM/bOtb6Vxy9d+gCgYIKoZIzj0DAQehRANCAAQQTaikGQq6lSECCwvmNzCsuBA6cdbeDai9RJCub0ZyGrG92BpTlIrCQueuz7+b8qss7e6XU/no/1zrNNPkLXX4\n-----END PRIVATE KEY-----'
    const teamId = '5L2NM6YDYV'
    const clientId = 'com.ftel.dsc.cahnfc.web'
    const keyId = 'LPWKW8D36B'
    const header = { alg: 'ES256', kid: keyId }
    const claims = {
      iss: teamId,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 86400 * 180, // 180 days
      aud: 'https://appleid.apple.com',
      sub: clientId,
    }

    const clientSecret = jwt.sign(claims, privateKey, {
      algorithm: 'ES256',
      header: header,
    })

    console.log('secret:', clientSecret)
  }, [])

  return (
    <>
      <Page />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (): Promise<{
  props: { dehydratedState: DehydratedState; initialZustandState?: any }
}> => {
  const queryClient = new QueryClient()
  if (!queryClient.getQueryData(['posts'])) {
    await queryClient.prefetchQuery<IPost[]>(['posts'], fetchPosts)
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      // initialZustandState: { count: 2 },
    },
  }
}

export default Home
Home.getLayout = function getLayout(page: ReactElement) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}
