import { fetchPosts } from '@/api-client'
import Page from '@/components/page'
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
import { ReactElement } from 'react'

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
// Home.getLayout = function getLayout(page: ReactElement) {
//   return <div>{page}</div>
// }
