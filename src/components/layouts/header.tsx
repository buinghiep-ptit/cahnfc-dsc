import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import { signOut, useSession } from 'next-auth/react'
import * as React from 'react'

export function Header() {
  const { data: session } = useSession()
  const handleSignOut = async () => {
    await signOut({ callbackUrl: window.location.href })
  }
  return (
    <Box>
      <Typography variant="h1">Navbar Header Component</Typography>
      {session ? <button onClick={handleSignOut}>SignOut</button> : null}
    </Box>
  )
}
