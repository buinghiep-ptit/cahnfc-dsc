import { IMatch } from '@/models'
import { Box, Stack, styled, Typography } from '@mui/material'
import moment from 'moment'
import Image from 'next/image'
import * as React from 'react'
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
})

export interface IProps {}

export function Matching(props: IProps) {
  const [items] = React.useState<IMatch[]>(
    Array(11)
      .fill(0)
      .map((_, index) => ({
        id: index + 1,
        dateStart: '2023-03-12T16:59:59.999Z',
        stadium: 'SVĐ Hàng Đẫy',
        status: index % 2 === 0 ? 1 : 0,
        league: 'V League',
        teams: [
          {
            id: 1,
            name: 'CAHN FC',
            goalRound: Math.floor(Math.random() * 10) + 1,
            logo: `/assets/images/logos/logo-${
              Math.floor(Math.random() * 4) + 1
            }.svg`,
          },
          {
            id: 2,
            name: 'SLNA FC',
            goalRound: Math.floor(Math.random() * 10) + 1,
            logo: `/assets/images/logos/logo-${
              Math.floor(Math.random() * 4) + 1
            }.svg`,
          },
        ],
      })),
  )

  const renderItem = (item: IMatch) => {
    return (
      <ItemContainer>
        <Typography
          variant="subtitle2"
          sx={{
            padding: '12px 16px',
            backgroundColor: item.status === 1 ? '#212529' : '#ED1E24',
            textAlign: 'start',
          }}
        >
          {moment(item.dateStart).format('DD/MM/YYYY')}, {item.stadium}
        </Typography>

        <JustifyBox flexDirection={'row'} py={2.5} gap={4} px={3}>
          <JustifyBox flexDirection={'column'} gap={1}>
            <Image
              src={'/assets/images/logos/logo-2.svg'}
              alt="logo 1"
              width={80}
              height={80}
            />
            <Typography variant="h6" color={'secondary'}>
              {item?.teams && item?.teams[0]?.name}
            </Typography>
          </JustifyBox>

          <JustifyBox flexDirection={'column'} gap={1}>
            <Stack
              direction={'row'}
              bgcolor={'#F1F3F5'}
              borderRadius="12px"
              gap={1.5}
              px={2}
              pb={0.5}
              divider={
                <Typography variant="h3" color={'secondary'}>
                  -
                </Typography>
              }
            >
              <Typography variant="h3" color={'secondary'}>
                {item?.teams && item?.teams[0]?.goalRound}
              </Typography>

              <Typography variant="h3" color={'secondary'}>
                {item?.teams && item?.teams[1]?.goalRound}
              </Typography>
            </Stack>
            <Typography variant="subtitle2" sx={{ color: '#ED1E24' }}>
              {item.league}
            </Typography>
          </JustifyBox>
          <JustifyBox flexDirection={'column'} gap={1}>
            <Image
              src={'/assets/images/logos/logo-1.svg'}
              alt="logo 2"
              width={80}
              height={80}
            />
            <Typography variant="h6" color={'secondary'}>
              {item?.teams && item?.teams[1]?.name}
            </Typography>
          </JustifyBox>
        </JustifyBox>
      </ItemContainer>
    )
  }
  return (
    <>
      <MUICarousel title="Trận đấu" titleColor="light">
        <>
          {items.map((item, index) => (
            <div className="item" key={index}>
              {renderItem(item)}
            </div>
          ))}
        </>
      </MUICarousel>
    </>
  )
}
