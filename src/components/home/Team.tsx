import { INews } from '@/models/news'
import { Box, Container, styled } from '@mui/material'
import * as React from 'react'
import { MUICarousel } from '../commons/MUICarousel'
import { PlayerItem } from './PlayerItem'

export const JustifyBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}))

export interface IProps {}

export function Team(props: IProps) {
  const [items] = React.useState<INews[]>(
    Array(11)
      .fill(0)
      .map((_, index) => ({
        id: index + 1,
        thumb: `/assets/images/home/player-avatar.png`,
        type: Math.floor(Math.random() * 3) + 1,
        shortDescription:
          'Chiều ngày 16.3, liên đoàn bóng đá Việt Nam đã công bố Ronaldo về MU',
        datePublished: '2023-03-12T16:59:59.999Z',
      })),
  )

  return (
    <Box
      p={6}
      sx={{
        textAlign: 'center',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundImage: 'url(/assets/images/home/bg-team.jpg)',
      }}
    >
      <Container>
        <MUICarousel title="đội hình thi đấu" titleColor="light">
          <>
            {items.map((item, index) => (
              <div className="item" key={index}>
                <PlayerItem item={item} />
              </div>
            ))}
          </>
        </MUICarousel>
      </Container>
    </Box>
  )
}
