import { IBanner } from '@/models/banner'
import { Box, Button, IconButton, Stack, Typography } from '@mui/material'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import * as React from 'react'
import { LazyNextImage } from '../LazyNextImage'
import { Video } from '../Video'

export interface Props {
  slides: IBanner[]
}
const images = [
  '/assets/images/bg-banner.jpg',
  '/assets/images/bg-banner.jpg',
  '/assets/images/card-img-2.jpg',
]

export function FMSwiperSlider({ slides }: Props) {
  const [index, setIndex] = React.useState(0)

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      if (index === images.length - 1) {
        setIndex(0)
        return
      }
      setIndex(index + 1)
    }, 5000)

    return () => clearInterval(intervalId)
  }, [index])

  const prevStep = () => {
    if (index === 0) {
      setIndex(images.length - 1)
      return
    }
    setIndex(index - 1)
  }
  const nextStep = () => {
    if (index === images.length - 1) {
      setIndex(0)
      return
    }

    setIndex(index + 1)
  }
  return (
    <Box
      sx={{
        // minHeight: '100vh',
        maxHeight: '1080px',
        overflow: 'hidden',
        position: 'relative',
        bgcolor: '#0F0C29',
      }}
    >
      <Box
        sx={{
          aspectRatio: 'calc(16/9)',
          bgcolor: '#FFFFFF',
          position: 'relative',
          overflow: 'hidden',
          width: '100%',
          background: '#ED1E24',
        }}
      >
        <AnimatePresence initial={true}>
          <motion.div
            initial={{ x: 1, opacity: 0.5 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -1, opacity: 0.5 }}
            key={images[index]}
            style={{ width: '100%', height: '100%' }}
          >
            {index === 0 ? (
              <Video />
            ) : (
              <LazyNextImage imgUrl={images[index] ?? ''} canHover={false} />
            )}
          </motion.div>
        </AnimatePresence>

        <IconButton
          onClick={prevStep}
          style={{ position: 'absolute', top: '50%', left: '16px' }}
        >
          <Image
            src={'/assets/images/vuesax/arrow-left.svg'}
            alt="logo"
            width={32}
            height={32}
          />
        </IconButton>

        <IconButton
          onClick={nextStep}
          style={{ position: 'absolute', top: '50%', right: '16px' }}
        >
          <Image
            src={'/assets/images/vuesax/arrow-right.svg'}
            alt="logo"
            width={32}
            height={32}
          />
        </IconButton>

        <Stack
          gap={6}
          position={'absolute'}
          bottom={'11%'}
          width="100%"
          alignItems={'center'}
        >
          <Typography variant="h4" sx={{ letterSpacing: '1px' }}>
            MỤC TIÊU CỦA ĐỨC LÀ GHI THẬT NHIỀU BÀN THẮNG
          </Typography>
          {index === 0 && (
            <Button sx={{ width: 200 }} variant="outlined">
              Xem video
            </Button>
          )}

          <Stack direction={'row'} gap={1}>
            {images.map((_, idx) => (
              <Box
                onMouseDown={() => setIndex(idx)}
                sx={{
                  opacity: idx === index ? 1 : 0.5,
                  transition: '0.5s ease-in-out',
                  cursor: 'pointer',
                }}
                key={idx}
                width={24}
                height={2}
                borderRadius={100}
                bgcolor={'#FFFFFF'}
                zIndex={9}
              ></Box>
            ))}
          </Stack>
        </Stack>
      </Box>
    </Box>
  )
}
