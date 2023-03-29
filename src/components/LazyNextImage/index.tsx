import styled from '@emotion/styled'
import { Box } from '@mui/material'
import Image from 'next/image'
import { useState } from 'react'

const Wrapper = styled(Box)({
  position: 'relative',
  width: '100%',
  height: '100%',
})

const Img = styled(Image)(({ loaded }: any) => ({
  opacity: loaded ? 1 : 0,
  transition: 'opacity 0.5s ease-in-out',
  cursor: 'pointer',
}))

const Overlay = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1,
})

export interface IProps {
  imgUrl: string
  canHover?: boolean
}

export const LazyNextImage = ({ imgUrl, canHover = true }: IProps) => {
  const [loading, setLoading] = useState(true)
  const [hover, setHover] = useState(false)
  const [showOverlay, setShowOverlay] = useState(false)

  const handleOnLoad = () => {
    setLoading(false)
  }

  const handleOnMouseEnter = () => {
    setShowOverlay(true)
    setHover(true)
  }

  const handleOnMouseLeave = () => {
    setHover(false)
    setShowOverlay(false)
  }

  const style = {
    transform: canHover && hover ? 'scale(1.05)' : 'scale(1)',
    transition: 'transform 0.3s ease',
  }

  return (
    <Wrapper
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
    >
      {loading && (
        <Overlay>
          <span>Đang tải...</span>
        </Overlay>
      )}
      <Img
        src={imgUrl}
        alt={'img lazy'}
        layout="fill"
        loaded={loading ? 0 : 1}
        onLoad={handleOnLoad}
        style={style}
      />
      {showOverlay && canHover && !loading && <div className="overlay"></div>}
    </Wrapper>
  )
}
