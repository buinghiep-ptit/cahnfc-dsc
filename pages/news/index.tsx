import { Breadcrumb } from '@/components/commons/Breadcrumb'
import { JustifyBox } from '@/components/commons/Cards/TVCard'
import { CustomizeTabs } from '@/components/commons/CustomizeTabs'
import { MuiTypography } from '@/components/commons/MuiTypography'
import { News } from '@/components/news'
import { PrimaryLayout } from '@/layouts'
import { Box, Container, Stack } from '@mui/material'
import * as React from 'react'

export interface IProps {}

function NewsPage() {
  const tabItems = {
    rootName: 'Tin tức',
    path: '/news',
    items: [
      {
        scope: 'overall',
        label: 'Toàn bộ',
      },
      {
        scope: 'matches',
        label: 'Trận đấu',
      },
      {
        scope: 'teams',
        label: 'Đội bóng',
      },
      {
        scope: 'interview',
        label: 'Phỏng vấn',
      },
      {
        scope: 'products',
        label: 'Sản phẩm',
      },
      {
        scope: 'fans',
        label: 'Cổ động viên',
      },
      {
        scope: 'others',
        label: 'Khác',
      },
    ],
  }

  const [currentTab, setCurrentTab] = React.useState<number>(0)

  return (
    <Box sx={{ pt: 14 }}>
      <Box
        sx={{
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundImage: 'url(/assets/images/news/bg-header-news.jpg)',
        }}
      >
        <Container sx={{ pt: 2, pb: 3.5 }}>
          <Stack gap={6}>
            <Breadcrumb
              routeSegments={[{ name: 'Tin tức' }]}
              textColor="light"
            />
            <MuiTypography
              variant="h2"
              fontSize={'3.5rem!important'}
              letterSpacing={'1px'}
            >
              TIN TỨC
            </MuiTypography>
          </Stack>
        </Container>
      </Box>
      <JustifyBox width={'100%'}>
        <CustomizeTabs
          navInfo={tabItems}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
      </JustifyBox>

      <News />
    </Box>
  )
}

export default NewsPage
NewsPage.getLayout = function getLayout(page: React.ReactElement) {
  return <PrimaryLayout isChangeColorHeader={false}>{page}</PrimaryLayout>
}
