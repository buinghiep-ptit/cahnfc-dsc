import React from 'react'
import { signIn } from 'next-auth/react'

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
  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={handleLogin}>Login</button>
    </div>
  )
}
