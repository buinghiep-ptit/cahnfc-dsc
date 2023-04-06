import { INews } from '@/models/news'
import { Container } from '@mui/material'
import * as React from 'react'
import { HighLightCard } from '../commons/Cards/HighLightCard'

export interface IProps {}

export function News(props: IProps) {
  const [items] = React.useState<INews[]>(
    Array(4)
      .fill(0)
      .map((_, index) => ({
        id: index + 1,
        thumb: `/assets/images/home/video-card.jpg`,
        type: Math.floor(Math.random() * 3) + 1,
        title: 'Công An Hà Nội - Hoàng Anh Gia Lai| Siêu phẩm sút xa, 90 phút',
        shortDescription:
          'Bàn thắng đẹp mắt từ cự ly 30m của ngoại binh Jhon Cley bên phía Công an Hà Nội khiến đối thủ Hoàng Anh Gia Lai chỉ có được kết quả hòa ở vòng 4 V-League 202',
      })),
  )
  return (
    <Container>
      <HighLightCard item={items[0]} />
    </Container>
  )
}
