import { INews } from '@/models/news'
import { Box, Button, Grid, Stack, styled, Typography } from '@mui/material'
import moment from 'moment'
import Image from 'next/image'
import * as React from 'react'
import { LazyNextImage } from '../LazyNextImage'

export const JustifyBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}))

const ItemContainer = styled(Box)<IProps>({
  borderRadius: '12px',
  backgroundColor: '#FFFFFF',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  cursor: 'pointer',
})

export interface IProps {}

export function CAHNTV(props: IProps) {
  const [items] = React.useState<INews[]>(
    Array(4)
      .fill(0)
      .map((_, index) => ({
        id: index + 1,
        thumb: `/assets/images/home/video-card.jpg`,
        type: Math.floor(Math.random() * 3) + 1,
        title: 'Công An Hà Nội - Hoàng Anh Gia Lai| Siêu phẩm sút xa, 90 phút',
      })),
  )

  const renderItem = (item: INews) => {
    return (
      <ItemContainer gap={1.5}>
        <Box
          sx={{
            aspectRatio: 'calc(3/2)',
            position: 'relative',
            overflow: 'hidden',
            width: '100%',
            borderRadius: '12px',
          }}
        >
          <LazyNextImage imgUrl={item.thumb ?? ''} />

          <Box
            sx={{
              position: 'absolute',
              bottom: 6,
              left: 12,
            }}
          >
            <Image
              src={'/assets/images/vuesax/Play.svg'}
              alt="logo 1"
              width={32}
              height={32}
            />
          </Box>
        </Box>
        <Stack direction={'column'} gap={1}>
          <Typography
            variant="h5"
            color={'secondary'}
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              whiteSpace: 'normal',
              WebkitLineClamp: '2',
              WebkitBoxOrient: 'vertical',
              letterSpacing: '1px',
            }}
          >
            {item.title}
          </Typography>
        </Stack>

        <Stack direction={'row'} alignItems="center" gap={0.75}>
          <Image
            src={'/assets/images/vuesax/clock.svg'}
            alt="logo 1"
            width={18}
            height={18}
          />
          <Typography
            variant="body2"
            sx={{
              color: '#868E96',
              lineHeight: 1,
              pt: 0.25,
            }}
          >
            {moment(item.datePublished).format('HH:ss, DD/MM/YYYY')}
          </Typography>
        </Stack>
      </ItemContainer>
    )
  }

  const highLightItem = () => {
    return (
      <Stack direction={'row'} gap={3} alignItems="center" pt={4} pb={8}>
        <Box
          flex={1}
          sx={{
            aspectRatio: 'calc(3/2)',
            position: 'relative',
            overflow: 'hidden',
            width: '100%',
            borderRadius: '12px',
            cursor: 'pointer',
          }}
        >
          <LazyNextImage
            imgUrl={'/assets/images/home/video-card-main.jpg' ?? ''}
          />
        </Box>

        <Box flex={1}>
          <Stack direction={'column'} gap={1.5} p={3}>
            <Box display={'flex'}>
              <Typography
                variant="subtitle1"
                color={'secondary'}
                sx={{
                  bgcolor: '#FFD200',
                  borderRadius: '4px',
                  px: 1,
                  pt: 1,
                  pb: 0.5,
                  fontWeight: 500,
                  lineHeight: 1.25,
                }}
              >
                {'Highlights'}
              </Typography>
            </Box>

            <Typography
              variant="h3"
              color={'secondary'}
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                whiteSpace: 'normal',
                WebkitLineClamp: '3',
                WebkitBoxOrient: 'vertical',
                letterSpacing: '1px',
              }}
            >
              {
                'Công An Hà Nội - Hoàng Anh Gia Lai| Siêu phẩm sút xa, 90 phút đầy kịch tính ở phố Núi'
              }
            </Typography>

            <Stack direction={'row'} alignItems="center" gap={0.75}>
              <Image
                src={'/assets/images/vuesax/clock.svg'}
                alt="logo 1"
                width={18}
                height={18}
              />
              <Typography
                variant="body2"
                sx={{
                  color: '#868E96',
                  lineHeight: 1,
                  pt: 0.25,
                }}
              >
                {moment(items[0]?.datePublished).format('HH:ss, DD/MM/YYYY')}
              </Typography>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    )
  }

  return (
    <>
      <Typography variant="h2" color={'secondary'}>
        {'CAHN FC TV'}
      </Typography>
      {highLightItem()}
      <Grid container spacing={3}>
        {items.map((item, index) => (
          <Grid item xs={12} sm={4} md={3} className="item" key={index}>
            {renderItem(item)}
          </Grid>
        ))}
      </Grid>
      <JustifyBox mt={4}>
        <Button
          onClick={() => {}}
          variant="contained"
          sx={{ color: '#FFD200', width: 200, height: 48 }}
        >
          Xem tất cả
        </Button>
      </JustifyBox>
    </>
  )
}
