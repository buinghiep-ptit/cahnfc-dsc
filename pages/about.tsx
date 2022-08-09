import { fetchPosts } from '@/api-client'
import { IPost } from '@/models'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import * as React from 'react'

export interface IAboutPageProps {
  posts?: IPost[]
}

export default function AboutPage({ posts }: IAboutPageProps) {
  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
  }: UseQueryResult<IPost[], Error> = useQuery<IPost[], Error>(
    ['posts'],
    fetchPosts,
  )
  return <div></div>
}

export async function getStaticProps() {
  return {
    props: {
      posts: null,
    },
  }
}
