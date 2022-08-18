import { Footer, Header } from '@/components/layouts'
import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import * as React from 'react'

export interface IDefaultLayoutProps {
  children?: React.ReactElement
}

export function PrimaryLayout({ children }: IDefaultLayoutProps) {
  return (
    <Box
      minHeight="100vh"
      sx={{ overflowX: 'hidden', display: 'flex', flexDirection: 'column' }}
    >
      <Header />
      <Typography variant="h1">Default Layout here</Typography>
      <Box component="main" flexGrow={1}>
        {children}
      </Box>
      <Footer />
    </Box>
  )
}
