import { Box, Stack } from '@mui/material'
import * as React from 'react'

export interface IProps {}

export function Products(props: IProps) {
  return (
    <div>
      <Stack
        direction={'row'}
        sx={{
          position: 'relative',
          aspectRatio: 'calc(4/1)',
          bgcolor: '#FFFFFF',
          overflow: 'hidden',
          width: '100%',
        }}
      >
        {Array(4)
          .fill(0)
          .map((_, index) => {
            return (
              <Box
                key={index}
                flex={1}
                bgcolor={index % 2 === 0 ? 'cyan' : 'grey'}
              >
                hello
              </Box>
            )
          })}
      </Stack>
    </div>
  )
}
