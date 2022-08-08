import { fetchPosts } from '@/api-client'
import Page from '@/components/page'
import { IPost } from '@/models'
import { initializeStore } from '@/store'
import {
  dehydrate,
  DehydratedState,
  QueryClient,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query'
import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import styles from '../styles/Home.module.css'

interface HomeProps {
  posts?: IPost[]
}

const Home: NextPage = () => {
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
