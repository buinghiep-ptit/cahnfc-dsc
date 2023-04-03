import { Stack } from '@mui/material'
import Image from 'next/image'
import * as React from 'react'
import { JustifyBox } from './CAHNTV'

export interface IProps {}

export function Sponsor() {
  const sponsorList = [
    { width: 200, height: 72, iconUrl: '/assets/images/vuesax/logo-vna.svg' },
    { width: 200, height: 72, iconUrl: '/assets/images/vuesax/logo-vnpay.svg' },
    {
      width: 160,
      height: 72,
      iconUrl: '/assets/images/vuesax/logo-kamito.svg',
    },
    {
      width: 200,
      height: 72,
      iconUrl: '/assets/images/vuesax/logo-postbank.svg',
    },
    {
      width: 200,
      height: 72,
      iconUrl: '/assets/images/vuesax/logo-sacombank.svg',
    },
  ]
  return (
    <JustifyBox
      bgcolor={'#BD0F14'}
      flexDirection="column"
      gap={1}
      py={6}
      px={2}
    >
      <Stack gap={3} direction="row">
        {sponsorList.slice(0, 3).map((item, index) => (
          <Image
            key={index}
            width={item.width}
            height={item.height}
            src={item.iconUrl}
            alt="logo"
          />
        ))}
      </Stack>
      <Stack gap={3} direction="row">
        {sponsorList.slice(3).map((item, index) => (
          <Image
            key={index}
            width={item.width}
            height={item.height}
            src={item.iconUrl}
            alt="logo"
          />
        ))}
      </Stack>
    </JustifyBox>
  )
}
