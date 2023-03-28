import { Stack } from '@mui/material'
import * as React from 'react'

export interface IProps {}

export function Products(props: IProps) {
  return (
    <div>
      <Stack
        sx={{
          position: 'relative',
          aspectRatio: 'calc(4/1)',
          bgcolor: '#FFFFFF',
          overflow: 'hidden',
          width: '100%',
          background: '#ED1E24',
        }}
      >
        Hello
      </Stack>
    </div>
  )
}
