import { Box, Breadcrumbs, Hidden, Stack, styled } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'

const BreadcrumbRoot = styled('div')(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
}))

const SubName = styled('span')(({ theme }) => ({
  textTransform: 'uppercase',
  color: '#495057',
  fontWeight: 500,
  fontSize: '13px',
}))

export interface IProps {
  routeSegments: { name?: string; path?: string }[]
}

export function Breadcrumb({ routeSegments }: IProps) {
  return (
    <BreadcrumbRoot>
      <Breadcrumbs
        separator={
          <Box mt={0.5}>
            <Image
              src={'/assets/images/vuesax/arrow-right-gray.svg'}
              width={16}
              height={16}
              alt=""
            />
          </Box>
        }
        sx={{
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <Link href="/" passHref>
          <a>
            <SubName>Trang chủ</SubName>
          </a>
        </Link>

        {routeSegments
          ? routeSegments.map((route, index) => {
              return index !== routeSegments.length - 1 ? (
                <Link key={index} href={route.path ?? ''} passHref>
                  <a>
                    <SubName>{route.name}</SubName>
                  </a>
                </Link>
              ) : (
                <SubName key={index}>{route.name}</SubName>
              )
            })
          : null}
      </Breadcrumbs>
    </BreadcrumbRoot>
  )
}
