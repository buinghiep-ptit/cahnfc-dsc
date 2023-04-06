/* eslint-disable import/no-named-as-default-member */
import { Banner } from '@/components/home/banner'
import { CAHNTV } from '@/components/home/CAHNTV'
import { Matching } from '@/components/home/Matching'
import { News } from '@/components/home/News'
import { Products } from '@/components/home/Products'
import { Sponsor } from '@/components/home/Sponsor'
import { Team } from '@/components/home/Team'
import { TrapezoidInfo } from '@/components/home/TrapezoidInfo'
import { PrimaryLayout } from '@/layouts'
import { NextPageWithLayout } from '@/models'
import { Box, Container } from '@mui/material'
import { ReactElement } from 'react'

const Home: NextPageWithLayout = () => {
  return (
    <Box position={'relative'} bgcolor={'#ed1e24'}>
      <Banner />

      <Box
        pt={9.5}
        pb={6}
        sx={{
          textAlign: 'center',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundImage: 'url(/assets/images/home/bg-match.jpg)',
        }}
      >
        <Container sx={{ position: 'relative' }}>
          <TrapezoidInfo />
          <Matching />
        </Container>
      </Box>

      <Box
        py={8}
        sx={{
          bgcolor: '#ffffff',
        }}
      >
        <Container sx={{ position: 'relative' }}>
          <News />
        </Container>
      </Box>
      <Products />
      <Box
        py={8}
        sx={{
          bgcolor: '#ffffff',
        }}
      >
        <Container sx={{ position: 'relative' }}>
          <CAHNTV />
        </Container>
      </Box>

      <section id="team">
        <Team />
      </section>
      <section id="sponsor">
        <Sponsor />
      </section>
    </Box>
  )
}

export default Home
Home.getLayout = function getLayout(page: ReactElement) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}
