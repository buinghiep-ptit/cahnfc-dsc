import { INews } from '@/models/news'
import { Box, styled, Typography } from '@mui/material'
import * as React from 'react'
import { LazyNextImage } from '../commons/LazyNextImage'

const ItemContainer = styled(Box)({
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
})

export interface IProps {
  item: INews
}

export function PlayerItem({ item }: IProps) {
  const [hover, setHover] = React.useState(false)
  const handleOnMouseEnter = () => {
    setHover(true)
  }

  const handleOnMouseLeave = () => {
    setHover(false)
  }

  return (
    <ItemContainer
      width={304}
      gap={2}
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
    >
      <Box position="relative" pt={6} pr={7}>
        <Box
          sx={{
            position: 'relative',
            overflow: 'hidden',
            backgroundColor: '#FFFFFF',
            aspectRatio: 'calc(3/4)',
            borderRadius: '12px 12px 0 0',
          }}
        >
          <Box className={`${hover ? 'ani-player-overlay' : ''}`}></Box>
          <Typography
            variant="h1"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              textAlign: 'start',
              letterSpacing: '1px',
              lineHeight: 1,
              transition: '0.5s ease-in-out',
              color: hover ? '#ED1E24' : '#CED4DA',
              p: 1.5,
              mt: -2.5,
              zIndex: 999,
            }}
          >
            {'05'}
          </Typography>
        </Box>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            zIndex: 9,
            width: '280px',
            height: '100%',
          }}
        >
          <LazyNextImage canOverlay={false} imgUrl={item.thumb ?? ''} />
        </Box>
      </Box>
      <Typography
        color={'primary'}
        textAlign="start"
        sx={{
          fontSize: '1.25rem',
          lineHeight: 1.5,
          fontWeight: 600,
        }}
      >
        <span style={{ color: '#FFD200', fontWeight: 500 }}>Hậu vệ</span>{' '}
        {'Đoàn Văn Hậu'}
      </Typography>
    </ItemContainer>
  )
}
