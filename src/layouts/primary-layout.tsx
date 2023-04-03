import { Footer } from '@/components/layouts'
import { HeaderNavbar } from '@/components/layouts/header'
import { Box } from '@mui/system'
import * as React from 'react'

export interface IDefaultLayoutProps {
  children?: React.ReactElement
}

function Loading() {
  return <div>Loading...</div>
}

export function PrimaryLayout({ children }: IDefaultLayoutProps) {
  return (
    <React.Suspense fallback={<Loading />}>
      <Box
        minHeight="100vh"
        sx={{ overflowX: 'hidden', display: 'flex', flexDirection: 'column' }}
      >
        <HeaderNavbar
          brand="CAHNFC"
          rightLinks={true}
          leftLink={true}
          fixed
          color="transparent"
          changeColorOnScroll={{
            height: 100,
            color: 'white',
          }}
        />
        <Box component="main" flexGrow={1}>
          {children}
        </Box>
        <Footer />
      </Box>
    </React.Suspense>
  )
}
