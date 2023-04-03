import { IRank } from '@/models/ranking'
import { Box, Button, Divider, Grid, Stack } from '@mui/material'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import * as React from 'react'
import { JustifyBox } from '../home/Matching'

export function AccordionRanking() {
  const [expanded, setExpanded] = React.useState<boolean>(false)
  const [items] = React.useState<IRank[]>(
    Array(14)
      .fill(0)
      .map((_, index) => ({
        id: index + 1,
        logo: `/assets/images/logos/logo-${
          Math.floor(Math.random() * 4) + 1
        }.svg`,
        name: 'Công an Hà Nội ' + (index + 1),
        roundNum: 12,
        point: 36,
        isMyTeam: index === 7,
      })),
  )

  const extractItems = (items: IRank[]) => {
    const idx = items.findIndex(item => item.isMyTeam)
    console.log('idx:', idx)
    if (!expanded) {
      if (idx < 4) return [...items.slice(0, 4)]
      else return [...items.slice(0, 3), ...items.slice(idx, idx + 1)]
    } else {
      return [...items]
    }
  }

  const toggleExpandRanking = () => {
    setExpanded(!expanded)
  }
  const renderRow = (item: IRank) => {
    return (
      <Stack
        direction={'row'}
        justifyContent="center"
        alignItems={'center'}
        width={'100%'}
        position="relative"
        py={1.5}
      >
        <Box
          bgcolor={item.isMyTeam ? '#FFD200' : '#FFFFFF'}
          position={'absolute'}
          width="calc(100% - 64px)"
          height={'100%'}
          borderRadius="4px"
        ></Box>
        <Grid
          container
          display={'flex'}
          justifyContent="space-between"
          alignItems={'center'}
          zIndex={99}
        >
          <Grid item xs={2}>
            <Typography
              color={'secondary'}
              variant="subtitle2"
              fontSize={'1rem'}
            >
              {item.id}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Stack
              direction={'row'}
              justifyContent="space-between"
              alignItems={'center'}
              flex={1}
            >
              <JustifyBox gap={1.5}>
                <Image
                  src={item.logo ?? ''}
                  alt="logo 1"
                  width={32}
                  height={32}
                />
                <Typography
                  color={'secondary'}
                  variant="subtitle2"
                  fontSize={'1rem'}
                >
                  {item.name}
                </Typography>
              </JustifyBox>
            </Stack>
          </Grid>
          <Grid item xs={2}>
            <Typography
              color={'secondary'}
              variant="subtitle2"
              fontSize={'1rem'}
            >
              {item.roundNum}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography
              color={'secondary'}
              variant="subtitle2"
              fontSize={'1rem'}
            >
              {item.point}
            </Typography>
          </Grid>
        </Grid>
      </Stack>
    )
  }

  return (
    <Stack width={'100%'}>
      <Stack
        mt={2}
        width="100%"
        divider={
          <Divider
            orientation="horizontal"
            sx={{ backgroundColor: '#F1F3F5', mx: 4 }}
            flexItem
          />
        }
      >
        {extractItems(items).map((item, index) => (
          <Box key={index}>{renderRow(item)}</Box>
        ))}
      </Stack>
      <Button variant="text" onClick={toggleExpandRanking}>
        <Image
          src={
            expanded
              ? '/assets/images/vuesax/arrow-up.svg'
              : '/assets/images/vuesax/arrow-down.svg'
          }
          alt="logo 1"
          width={24}
          height={24}
          style={{
            filter:
              'invert(100%) sepia(100%) saturate(0%) hue-rotate(84deg) brightness(111%) contrast(101%)',
          }}
        />
      </Button>
    </Stack>
  )
}
