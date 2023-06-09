import MenuIcon from '@mui/icons-material/Menu'
import { Container, Stack, styled } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import * as React from 'react'
import { useEffect, useState } from 'react'
// import { FadeInSection } from '../common/fadein-section'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { CustomDropdown } from '../commons/CustomDropdown'

interface Props {
  brand?: string
  leftLink?: React.ReactElement | null | boolean
  rightLinks?: React.ReactElement | null | boolean
  rightIcon?: React.ReactElement | null | boolean
  fixed?: boolean
  color: 'transparent' | 'white' | 'dark'
  changeColorOnScroll: {
    height: number
    color: 'white' | 'dark'
  }
}

const drawerWidth = 240
export const navItems = [
  { to: 'home', label: 'Trang chủ' },
  { to: 'introduction', label: 'Giới thiệu' },
  { to: 'feature', label: 'Tính năng' },
  { to: 'cooperate', label: 'Hợp tác' },
]

interface StyledAppBarProps {
  open?: boolean
}

const StyledAppBar = styled(AppBar)<StyledAppBarProps>(({ open, theme }) => {
  return {
    display: 'flex',
    border: '0',
    padding: '1rem 0',
    borderRadius: '3px',
    color: '#555',
    width: '100%',
    backgroundColor: open ? 'transparent' : '#ED1E24',
    boxShadow: open
      ? 'none'
      : '0 4px 18px 0px rgba(0, 0, 0, 0.12), 0 7px 10px -5px rgba(0, 0, 0, 0.15)',
    transition: 'all .3s ease-out 0s',
    position: 'fixed',
    zIndex: '1100',
  }
})
export interface IRoute {
  name?: string
  icon?: React.ReactElement
  route?: string
  callBack?: () => void
  collapse?: {
    name?: string
    icon?: React.ReactElement
    route?: string
    callBack?: () => void
  }[]
}

export function HeaderNavbar(props: Props) {
  const { color, changeColorOnScroll, leftLink, rightLinks } = props
  const [mobileOpen, setMobileOpen] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(true)
  const router = useRouter()
  const { data: session } = useSession()

  const handleSignOut = async () => {
    await signOut({ callbackUrl: window.location.href })
  }
  const routesLeft: IRoute[] = [
    {
      name: 'Tin tức',
      route: '/',
    },
    {
      name: 'Video',
      route: '/posts',
    },
    {
      name: 'Đội hình',
      route: '/protected',
    },
    {
      name: 'Trận đấu',
      route: '/matching',
    },
    {
      name: 'Hội viên',
      route: '/pages/authentication/sign-in',
    },
  ]

  const routesRight: IRoute[] = [
    {
      name: 'Đặt vé',
      route: '/pages/authentication/sign-in',
      icon: (
        <Image
          src={'/assets/images/vuesax/ticket-star.svg'}
          alt="logo"
          width={24}
          height={24}
        />
      ),
    },
    {
      name: 'Giỏ hàng',
      route: '/cart',
      icon: (
        <Image
          src={'/assets/images/vuesax/bag.svg'}
          alt="logo"
          width={24}
          height={24}
        />
      ),
    },
    {
      name: 'Cửa hàng',
      route: '/store',

      collapse: [
        {
          name: 'Quần áo thi đấu',
          route: '/store/shirt',
        },
        {
          name: 'Bộ sưu tập',
          route: '/store/collection',
        },
      ],
    },
    {
      name: '',
      icon: (
        <Image
          src={'/assets/images/vuesax/profile.svg'}
          alt="logo"
          width={24}
          height={24}
        />
      ),
      collapse: [
        {
          name: 'Đăng nhập',
          route: '/login',
        },
        {
          name: 'Đăng ký',
          route: '/register',
        },
        {
          name: 'Thông tin cá nhân',
          route: '/profile',
        },
        {
          name: 'Đăng xuất',
        },
      ],
    },
  ]

  const headerColorChange = () => {
    const windowsScrollTop = window.pageYOffset
    if (windowsScrollTop > changeColorOnScroll.height) {
      setOpen(false)
    } else {
      setOpen(true)
    }
  }

  useEffect(() => {
    if (changeColorOnScroll) {
      window.addEventListener('scroll', headerColorChange)
    }
    return function cleanup() {
      if (changeColorOnScroll) {
        window.removeEventListener('scroll', headerColorChange)
      }
    }
  })

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const renderRoutesLeft = routesLeft.map(
    ({ name, icon, route, collapse }: IRoute, index) => (
      <CustomDropdown
        key={index}
        name={name}
        route={route}
        icon={icon}
        collapse={collapse}
      />
    ),
  )

  const renderRoutesRight = routesRight.map(
    ({ name, icon, route, collapse }: IRoute, index) => (
      <CustomDropdown
        key={index}
        name={name}
        route={route}
        icon={icon}
        collapse={collapse}
        fontType="normal"
      />
    ),
  )

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography
        sx={{
          my: 1,
          fontFamily: 'Livvic',
          fontSize: '1.25rem',
          color: '#101426',
        }}
      >
        CAHNFC
      </Typography>
      <Divider />
      <List></List>
    </Box>
  )

  const container = undefined

  return (
    <Box component="header" sx={{ display: 'flex', px: 0 }}>
      <StyledAppBar open={open}>
        <Container>
          <Toolbar
            sx={{
              px: { xs: 0 },
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}
          >
            {rightLinks && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
            )}

            <Stack direction={'row'} gap={4}>
              <Image
                onClick={() => router.push('/')}
                src={'/assets/images/logo.svg'}
                style={{ cursor: 'pointer' }}
                alt="logo"
                width={80}
                height={80}
              />
              {leftLink && (
                <Stack
                  gap={2}
                  direction={'row'}
                  sx={{
                    display: {
                      xs: 'none',
                      sm: 'flex',
                      cursor: 'pointer',
                    },
                  }}
                >
                  {renderRoutesLeft}
                </Stack>
              )}
            </Stack>
            {rightLinks && (
              <Stack
                gap={1.25}
                direction={'row'}
                divider={
                  <Divider
                    orientation="vertical"
                    sx={{ backgroundColor: '#FFFFFF', my: 0.75 }}
                    flexItem
                  />
                }
                sx={{
                  display: {
                    xs: 'none',
                    sm: 'flex',
                    cursor: 'pointer',
                  },
                }}
              >
                {renderRoutesRight}
              </Stack>
            )}
            {session ? (
              <CustomDropdown
                name={'User'}
                route={'/user-info'}
                collapse={[
                  {
                    name: 'Thông tin tài khoản',
                    route: '/user-info',
                  },
                  {
                    name: 'Đăng xuất',
                    callBack: () => handleSignOut(),
                  },
                ]}
              />
            ) : null}
          </Toolbar>
        </Container>
      </StyledAppBar>

      {(rightLinks || leftLink) && (
        <Box component="nav">
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
      )}
    </Box>
  )
}
