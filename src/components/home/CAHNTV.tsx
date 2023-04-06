import { INews } from '@/models/news'
import { Box, Button, Grid, styled, Typography } from '@mui/material'
import * as React from 'react'
import { HighLightCard } from '../commons/Cards/HighLightCard'
import { TVCard } from '../commons/Cards/TVCard'

export const JustifyBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}))

export interface IProps {}

export function CAHNTV(props: IProps) {
  const [items] = React.useState<INews[]>(
    Array(4)
      .fill(0)
      .map((_, index) => ({
        id: index + 1,
        thumb: `/assets/images/home/video-card.jpg`,
        type: 1,
        title: 'Công An Hà Nội - Hoàng Anh Gia Lai| Siêu phẩm sút xa, 90 phút',
        datePublished: '2023-04-06T09:10:36.067Z',
      })),
  )

  return (
    <>
      <Typography variant="h2" color={'secondary'}>
        {'CAHN FC TV'}
      </Typography>
      <HighLightCard item={items[0]} />
      <Grid container spacing={3}>
        {items.map((item, index) => (
          <Grid item xs={12} sm={4} md={3} className="item" key={index}>
            <TVCard item={item} index={index} />
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
