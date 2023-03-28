import { PrimaryLayout } from '@/layouts'
import { GetStaticProps, GetStaticPropsContext } from 'next'
import Link from 'next/link'
import * as React from 'react'

export interface IProps {
  newsList: any[]
}

function NewsList({ newsList }: IProps) {
  return (
    <div>
      <h1>PostList Page</h1>
      <ul>
        {newsList.map(post => (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export const getStaticProps: GetStaticProps<IProps> = async (
  context: GetStaticPropsContext,
) => {
  // server-side
  // build-time
  const response = await fetch(
    'https://js-post-api.herokuapp.com/api/posts?_page=1',
  )
  const data = await response.json()

  return {
    props: {
      newsList: data.data,
    },
  }
}
export default NewsList
NewsList.getLayout = function getLayout(page: React.ReactElement) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}
