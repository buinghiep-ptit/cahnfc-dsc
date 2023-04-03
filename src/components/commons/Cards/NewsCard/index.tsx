import { INews } from '@/models/news'
import { Box, Card, Divider, IconButton, Stack, styled } from '@mui/material'
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import { LazyNextImage } from '../../LazyNextImage'
import { MuiTypography } from '../../MuiTypography'

export const JustifyBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}))

const ItemContainer = styled(Box)({
  backgroundColor: '#FFFFFF',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
})

export interface IProps {
  item: INews
}

export function NewsCard({ item }: IProps) {
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
    <Card>
      <ItemContainer maxWidth={300} gap={1.5}>
        <Link href={'/'} passHref>
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
          </Box>
        </Link>

        <Stack direction={'column'} gap={1}>
          <Link href={'/'} passHref>
            <a>
              <MuiTypography
                variant="h5"
                color={'secondary'}
                ellipsis={'ellipsis'}
              >
                {item.title}
              </MuiTypography>
            </a>
          </Link>
          <MuiTypography
            variant="body2"
            color={'secondary'}
            ellipsis={'ellipsis'}
          >
            {item.shortDescription}
          </MuiTypography>
        </Stack>

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
      </ItemContainer>
    </Card>
  )
}
