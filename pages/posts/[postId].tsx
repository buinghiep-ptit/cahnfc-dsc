import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import * as React from 'react'

export interface IProps {
  post: any
}

export default function PostDetail({ post }: IProps) {
  const router = useRouter()
  console.log(router.isFallback)

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>Post Detail</h1>
      <p>{post.title}</p>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  console.log('GetStaticPaths')
  const response = await fetch(
    'https://js-post-api.herokuapp.com/api/posts?_page=1',
  )
  const data = await response.json()

  return {
    paths: data.data.map((post: any) => ({ params: { postId: post?.id } })),
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<IProps> = async (
  context: GetStaticPropsContext,
) => {
  console.log('GetStaticProps', context.params?.postId)
  const postId = context.params?.postId
  if (!postId)
    return {
      notFound: true,
    }
  // server-side
  // build-time
  const response = await fetch(
    `https://js-post-api.herokuapp.com/api/posts/${postId}`,
  )
  const data = await response.json()

  return {
    props: { post: data },
    revalidate: 5,
  }
}
