import { INews } from '@/models/news'
import { Box, Button, Stack, styled, Typography } from '@mui/material'
import moment from 'moment'
import Image from 'next/image'
import * as React from 'react'
import { ImageLazy } from '../ImageLazy'
import { LazyNextImage } from '../LazyNextImage'
import { MUICarousel } from '../MUICarousel'

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
})

export interface IProps {}

export function News(props: IProps) {
  const [items] = React.useState<INews[]>(
    Array(11)
      .fill(0)
      .map((_, index) => ({
        id: index + 1,
        thumb: `/assets/images/home/news-card-${
          Math.floor(Math.random() * 2) + 1
        }.jpg`,
        type: Math.floor(Math.random() * 3) + 1,
        title:
          'DANH SÁCH THAM DỰ U23 CUP – DOHA QATAR 2023: 5 SAO TRẺ CỦA CÔNG AN HẢI DƯƠNG CITY',
        shortDescription:
          'Chiều ngày 16.3, liên đoàn bóng đá Việt Nam đã công bố Ronaldo về MU',
        datePublished: '2023-03-12T16:59:59.999Z',
      })),
  )

  const convertTypeToLabel = (type: number) => {
    switch (type) {
      case 1:
        return 'Cầu thủ'
      case 2:
        return 'V League'
      case 3:
        return 'Tin tức'
      default:
        return ''
    }
  }

  const renderItem = (item: INews) => {
    return (
      <ItemContainer maxWidth={300} gap={1.5}>
        <Box
          sx={{
            aspectRatio: 'calc(3/2)',
            position: 'relative',
            overflow: 'hidden',
            width: '100%',
            borderRadius: '12px',
          }}
        >
          {/* <Image
            src={item.thumb ?? ''}
            alt="logo 1"
            // width={'100%'}
            // height={'100%'}
            layout="fill"
          /> */}
          <LazyNextImage imgUrl={item.thumb ?? ''} />
          <Typography
            variant="subtitle2"
            color={'secondary'}
            sx={{
              position: 'absolute',
              top: 12,
              left: 0,
              bgcolor: '#FFD200',
              borderRadius: '0 4px 4px 0',
              px: 1,
              py: 0.5,
            }}
          >
            {convertTypeToLabel(item.type ?? 0)}
          </Typography>
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
              wordBreak: 'break-all',
            }}
          >
            {item.title}
          </Typography>

          <Typography
            variant="body2"
            color={'secondary'}
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              whiteSpace: 'normal',
              WebkitLineClamp: '2',
              WebkitBoxOrient: 'vertical',
              wordBreak: 'break-all',
            }}
          >
            {item.shortDescription}
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
  return (
    <>
      <MUICarousel title="Tin tức" titleColor="dark">
        <>
          {items.map((item, index) => (
            <div className="item" key={index}>
              {renderItem(item)}
            </div>
          ))}
        </>
      </MUICarousel>
      <JustifyBox>
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
