import {
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'
import * as React from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { MuiRHFInputText } from '@/components/commons/MuiRHFTextInput'
import { JustifyBox } from '@/components/home/CAHNTV'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import Image from 'next/image'
import Link from 'next/link'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export interface IProps {}

type SchemaType = {
  mobilePhone?: string
  password?: string
}

export default function SignIn(props: IProps) {
  const router = useRouter()
  const { next } = router.query
  const { data: session, status } = useSession()

  const [showPassword, setShowPassword] = React.useState<{
    visibility: boolean
  }>({
    visibility: false,
  })
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

  const validationSchema = Yup.object().shape({
    mobilePhone: Yup.string()
      .matches(phoneRegExp, {
        message: 'Số điện thoại không hợp lệ',
        excludeEmptyString: true,
      })
      .test('len', 'Số điện thoại yêu cầu 10 ký tự', val => {
        if (val == undefined) {
          return true
        }
        return val.length == 0 || val.length === 10
      })
      .required('messages.MSG1'),
    password: Yup.string().required('messages.MSG1'),
  })

  const methods = useForm({
    defaultValues: {},
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  })

  const onSubmitHandler: SubmitHandler<SchemaType> = (values: SchemaType) => {
    console.log(values)
  }

  const handleClickShowPassword = () => {
    setShowPassword(prev => ({
      ...prev,
      visibility: !prev.visibility,
    }))
  }

  const handleLogin = async () => {
    const res = await signIn('credentials', {
      email: 'giangcm@fpt.com.vn',
      password: 'abc123456',
      callbackUrl: next ? (next as string) : '',
    })
    console.log('res:', res)
  }
  console.log('status:', status)

  const handleLoginFacebook = async () => {
    const res = await signIn('facebook', {
      callbackUrl: next ? (next as string) : '',
    })
    console.log('facebook:', res)
  }

  const handleLoginGoogle = async () => {
    const res = await signIn('google', {
      callbackUrl: next ? (next as string) : '',
      // uselessWindow: true,
    })
    console.log('google:', res)
  }

  const handleLoginApple = async () => {
    const res = await signIn('apple')
    console.log('apple:', res)
  }

  return (
    <JustifyBox
      minHeight={'100vh'}
      sx={{
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundImage: 'url(/assets/images/signIn/bg-signIn.jpg)',
      }}
    >
      <Container
        sx={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'row',
        }}
      >
        <IconButton sx={{ position: 'absolute', top: 0, left: 20 }}>
          <Image
            src="/assets/images/vuesax/arrow-left-circle.svg"
            width={40}
            height={40}
            alt=""
          />
        </IconButton>
        <Box
          bgcolor={'#FFFFFF'}
          borderRadius={3}
          width={{ xs: '100%', md: '70%' }}
          px={{ xs: 2, md: 12 }}
          gap={2}
          py={4.5}
        >
          <Stack alignItems={'center'} pb={2} gap={2}>
            <Image
              src="/assets/images/logo-border.svg"
              width={108}
              height={108}
              alt=""
            />
            <Typography variant="h3" color={'secondary'} letterSpacing={'1px'}>
              Đăng nhập
            </Typography>
          </Stack>

          <form
            onSubmit={methods.handleSubmit(onSubmitHandler)}
            noValidate
            autoComplete="off"
          >
            <FormProvider {...methods}>
              <Stack gap={2.5}>
                <Stack gap={1.5}>
                  <Typography variant="body1" color={'secondary'}>
                    Số điện thoại
                  </Typography>
                  <MuiRHFInputText
                    label={'Số điện thoại'}
                    required
                    type="text"
                    name="mobilePhone"
                    defaultValue=""
                    placeholder="Nhập số điện thoại"
                    autoFocus={true}
                  />
                </Stack>

                <Stack gap={1.5}>
                  <Typography variant="body1" color={'secondary'}>
                    Mật khẩu
                  </Typography>
                  <MuiRHFInputText
                    label={'Mật khẩu'}
                    type={showPassword.visibility ? 'text' : 'password'}
                    name="password"
                    defaultValue=""
                    placeholder="Nhập mật khẩu"
                    iconEnd={
                      <IconButton onClick={handleClickShowPassword} edge="end">
                        {!showPassword.visibility ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    }
                    fullWidth
                    required
                  />
                </Stack>
                <Link href={'/forgot-password'} passHref>
                  <a>
                    <Typography
                      variant="body1"
                      fontWeight={500}
                      color={'secondary'}
                      textAlign="end"
                    >
                      Quên mật khẩu?
                    </Typography>
                  </a>
                </Link>

                <Button
                  onClick={() => {}}
                  variant="contained"
                  sx={{
                    color: '#FFD200',
                    width: '100%',
                    height: 48,
                    mt: 1,
                  }}
                >
                  Đăng nhập
                </Button>
              </Stack>
            </FormProvider>
          </form>
          <Stack my={4} gap={2}>
            <Typography variant="body1" color={'secondary'} textAlign="center">
              Hoặc đăng nhập bằng
            </Typography>
            <Stack direction={'row'} gap={3} justifyContent="center">
              <Button
                onClick={() => {}}
                variant="contained"
                sx={{
                  height: 48,
                  background: '#E7F5FF',
                  boxShadow: 'none',
                  width: 175,
                }}
              >
                <Stack
                  direction={'row'}
                  alignItems={'center'}
                  justifyContent="center"
                  gap={2}
                  px={1}
                >
                  <Image
                    src="/assets/images/social/fb-square.svg"
                    width={24}
                    height={24}
                    alt=""
                  />
                  <Typography
                    variant="subtitle1"
                    fontWeight={500}
                    color={'secondary'}
                  >
                    Facebook
                  </Typography>
                </Stack>
              </Button>
              <Button
                onClick={handleLoginGoogle}
                variant="contained"
                sx={{
                  height: 48,
                  background: '#FFF5F5',
                  boxShadow: 'none',
                  width: 175,
                }}
              >
                <Stack
                  direction={'row'}
                  alignItems={'center'}
                  justifyContent="center"
                  gap={2}
                  px={1}
                >
                  <Image
                    src="/assets/images/social/gg-square.svg"
                    width={24}
                    height={24}
                    alt=""
                  />
                  <Typography
                    variant="subtitle1"
                    fontWeight={500}
                    color={'secondary'}
                  >
                    Google
                  </Typography>
                </Stack>
              </Button>
            </Stack>
          </Stack>
          <Link href={'/register'} passHref>
            <a>
              <Typography
                variant="body1"
                color={'secondary'}
                textAlign="center"
              >
                Bạn chưa có tài khoản?{' '}
                <span style={{ color: '#ED1E24', fontWeight: 600 }}>
                  Đăng ký ngay
                </span>
              </Typography>
            </a>
          </Link>
        </Box>
      </Container>
    </JustifyBox>
  )
}
