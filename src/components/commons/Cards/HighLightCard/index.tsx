import { INews } from '@/models/news'
import { Box, Divider, IconButton, Stack } from '@mui/material'
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import * as React from 'react'
import { LazyNextImage } from '../../LazyNextImage'
import { MuiTypography } from '../../MuiTypography'

export interface IProps {
  item: INews
}

export function HighLightCard({ item }: IProps) {
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
  return (
    <>
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
          <Link href={'/'} passHref>
            <LazyNextImage imgUrl={item.thumb ?? ''} />
          </Link>
        </Box>

        <Box flex={1}>
          <Stack direction={'column'} gap={1.5} p={3}>
            <Box display={'flex'}>
              <MuiTypography
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
              </MuiTypography>
            </Box>

            <Link href={'/'} passHref>
              <a>
                <MuiTypography
                  variant="h3"
                  color={'secondary'}
                  ellipsis={'ellipsis'}
                  lineclamp={3}
                  sx={{
                    letterSpacing: '1px',
                  }}
                >
                  {item.title}
                </MuiTypography>
              </a>
            </Link>

            {item.shortDescription && (
              <MuiTypography
                variant="body1"
                color={'secondary'}
                ellipsis={'ellipsis'}
                lineclamp={3}
                sx={{ fontSize: '0.9375rem' }}
              >
                {item.shortDescription}
                {item.shortDescription}
              </MuiTypography>
            )}

            <Stack
              direction={'row'}
              alignItems="center"
              justifyContent={'space-between'}
              mt={-1}
            >
              <Stack
                direction={'row'}
                alignItems="center"
                gap={1}
                divider={
                  <Divider
                    orientation="vertical"
                    sx={{ background: '#D9D9D9', my: 0.5 }}
                    flexItem
                  />
                }
              >
                <MuiTypography
                  variant="subtitle1"
                  sx={{
                    fontFamily: 'UTM Bebas',
                    color: '#ED1E24',
                    fontWeight: 400,
                  }}
                >
                  {convertTypeToLabel(item.type ?? 0)}
                </MuiTypography>
                <MuiTypography
                  variant="body2"
                  sx={{
                    color: '#868E96',
                    lineHeight: 1,
                    pt: 0.25,
                  }}
                >
                  {moment(item.datePublished).format('HH:ss, DD/MM/YYYY')}
                </MuiTypography>
              </Stack>
              <IconButton>
                <Image
                  src={'/assets/images/vuesax/share.svg'}
                  alt="icon"
                  width={20}
                  height={20}
                />
              </IconButton>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </>
  )
}
