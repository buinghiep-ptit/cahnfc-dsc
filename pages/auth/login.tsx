import React from 'react'
import { signIn } from 'next-auth/react'
import Seo from '@/components/commons/seo'
import Head from 'next/head'

export interface ILoginPageProps {}

export default function LoginPage(props: ILoginPageProps) {
  const handleLogin = async () => {
    const res = await signIn('credentials', {
      email: 'nghiepbv2',
      password: '20121991',
      redirect: false,
    })
    console.log('res:', res)
  }

  const handleLoginFacebook = async () => {
    const res = await signIn('facebook')
    console.log('facebook:', res)
  }

  return (
    <div>
      <Head>
        <title>Login</title>
        <meta
          name="description"
          content="This is a desription for My Next App"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Login Page</h1>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLoginFacebook}>Login Facebook</button>
    </div>
  )
}
