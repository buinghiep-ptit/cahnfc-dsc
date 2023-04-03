import React from 'react'
import { signIn, useSession } from 'next-auth/react'
import Seo from '@/components/commons/seo'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Box } from '@mui/system'

export interface ILoginPageProps {}

export default function SignIn(props: ILoginPageProps) {
  const router = useRouter()
  const { next } = router.query
  const { data: session, status } = useSession()

  const handleLogin = async () => {
    const res = await signIn('credentials', {
      email: 'giangcm@fpt.com.vn',
      password: 'abc123456',
      callbackUrl: next ? (next as string) : '',
    })
    console.log('res:', res)
  }
  console.log('status:', status)

  const handleLoginFacebook = async () => {
    const res = await signIn('facebook', {
      callbackUrl: next ? (next as string) : '',
    })
    console.log('facebook:', res)
  }

  const handleLoginGoogle = async () => {
    const res = await signIn('google', {
      callbackUrl: next ? (next as string) : '',
      // uselessWindow: true,
    })
    console.log('google:', res)
  }

  const handleLoginApple = async () => {
    const res = await signIn('apple')
    console.log('apple:', res)
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
      {/* <div>
        {loading ? (
          <p>Loading...</p>
        ) : session ? (
          <p>You are already logged in.</p>
        ) : (
          <button onClick={() => signIn('google')}>Sign in with Google</button>
        )}
      </div> */}
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <button onClick={handleLogin}>Login</button>
        <button onClick={handleLoginFacebook}>Login Facebook</button>
        <button onClick={handleLoginGoogle}>Login Google</button>
        <button onClick={handleLoginApple}>Login Apple</button>
      </Box>
    </div>
  )
}
