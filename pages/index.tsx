/* eslint-disable import/no-named-as-default-member */
import { FMSwiperSlider } from '@/components/FMSwiperSilder'
import { Matching } from '@/components/home/Matching'
import { News } from '@/components/home/News'
import { Products } from '@/components/home/Products'
import { TrapezoidInfo } from '@/components/home/TrapezoidInfo'
import { PrimaryLayout } from '@/layouts'
import { IPost, NextPageWithLayout } from '@/models'
import { Box, Container } from '@mui/material'
import { dehydrate, DehydratedState, QueryClient } from '@tanstack/react-query'
import type { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { ReactElement, useState } from 'react'

interface HomeProps {
  posts?: IPost[]
}

const Home: NextPageWithLayout = () => {
  const x = 200

  const router = useRouter()

  const [tabIndex, setTabIndex] = useState(0)

  // const { data }: UseQueryResult<IPost[], Error> = useQuery<IPost[], Error>(
  //   ['posts'],
  //   fetchPosts,
  // )
  // const { data: otherData }: UseQueryResult<IPost[], Error> = useQuery<
  //   IPost[],
  //   Error
  // >(['posts'], fetchPosts)

  // useEffect(() => {
  //   const privateKey =
  //     '-----BEGIN PRIVATE KEY-----\nMIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgf0cdzc3hp39tqFSmo4mM+Oxdj+RQnXM/bOtb6Vxy9d+gCgYIKoZIzj0DAQehRANCAAQQTaikGQq6lSECCwvmNzCsuBA6cdbeDai9RJCub0ZyGrG92BpTlIrCQueuz7+b8qss7e6XU/no/1zrNNPkLXX4\n-----END PRIVATE KEY-----'
  //   const teamId = '5L2NM6YDYV'
  //   const clientId = 'com.ftel.dsc.cahnfc'
  //   const keyId = 'LPWKW8D36B'
  //   const header = { alg: 'ES256', kid: keyId }
  //   const claims = {
  //     iss: teamId,
  //     iat: Math.floor(Date.now() / 1000),
  //     exp: Math.floor(Date.now() / 1000) + 86400 * 180, // 180 days
  //     aud: 'https://appleid.apple.com',
  //     sub: clientId,
  //   }

  //   const clientSecret = jwt.sign(claims, privateKey, {
  //     algorithm: 'ES256',
  //     header: header,
  //   })

  //   console.log('secret:', clientSecret)
  // }, [])

  return (
    <Box position={'relative'} bgcolor={'#ed1e24'}>
      <FMSwiperSlider />

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
    </Box>
  )
}

export const getServerSideProps: GetServerSideProps = async (): Promise<{
  props: { dehydratedState: DehydratedState; initialZustandState?: any }
}> => {
  const queryClient = new QueryClient()
  // if (!queryClient.getQueryData(['posts'])) {
  //   await queryClient.prefetchQuery<IPost[]>(['posts'], fetchPosts)
  // }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      // initialZustandState: { count: 2 },
    },
  }
}

export default Home
Home.getLayout = function getLayout(page: ReactElement) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}
