import AppLoading from '@/components/commons/AppLoading'
import { MuiButton } from '@/components/commons/MuiButton'
import { MuiRHFInputText } from '@/components/commons/MuiRHFTextInput'
import { MuiTypography } from '@/components/commons/MuiTypography'
import { PopupNotification } from '@/components/commons/PopupNotification'
import { JustifyBox } from '@/components/home/CAHNTV'
import { yupResolver } from '@hookform/resolvers/yup'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'
import _ from 'lodash'
import { signIn, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import * as React from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import * as Yup from 'yup'

export interface IProps {}

type SchemaType = {
  phoneNumber?: string
  password?: string
}

export default function SignIn(props: IProps) {
  const router = useRouter()
  const { next } = router.query
  const { data: session, status } = useSession()
  const [isLogging, setIsLogging] = React.useState(false)
  const [errors, setErrors] = React.useState<{ errorMsg?: string }>()
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    if (session) router.push('/')
  })

  const [showPassword, setShowPassword] = React.useState<{
    visibility: boolean
  }>({
    visibility: false,
  })
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

  const validationSchema = Yup.object().shape({
    phoneNumber: Yup.string()
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
      .required('Giá trị bắt buộc'),
    password: Yup.string().required('Giá trị bắt buộc'),
  })

  const methods = useForm({
    defaultValues: { phoneNumber: '', password: '' },
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  })

  const onSubmitHandler: SubmitHandler<SchemaType> = (values: SchemaType) => {
    handleLoginPhone(values.phoneNumber ?? '', values.password ?? '')
  }

  const handleClickShowPassword = () => {
    setShowPassword(prev => ({
      ...prev,
      visibility: !prev.visibility,
    }))
  }

  const handleLoginPhone = async (phoneNumber: string, password: string) => {
    setIsLogging(true)
    await signIn('credentials', {
      phoneNumber: phoneNumber,
      password: password,
      callbackUrl: next ? (next as string) : '',
      redirect: false,
    }).then(({ ok, error }: any) => {
      setIsLogging(false)

      if (!ok) {
        setErrors(prev => ({
          ...prev,
          errorMsg: JSON.parse(error).errorMsg,
        }))
        setOpen(true)
      } else {
        setErrors(undefined)
      }
    })
  }

  const handleLoginFacebook = async () => {
    setIsLogging(true)

    const result = await signIn('facebook', {
      callbackUrl: next ? (next as string) : '',
      redirect: false,
    })

    if (result?.error) {
      setErrors(prev => ({
        ...prev,
        errorMsg: 'Đăng nhập không thành công, vui lòng thử lại!',
      }))
      setOpen(true)
    } else {
      setErrors(undefined)
    }
    setIsLogging(false)
  }

  const handleLoginGoogle = async () => {
    setIsLogging(true)

    const result = await signIn('google', {
      callbackUrl: next ? (next as string) : '',
      redirect: false,
    })
    if (result?.error) {
      setErrors(prev => ({
        ...prev,
        errorMsg: 'Đăng nhập không thành công, vui lòng thử lại!',
      }))
      setOpen(true)
    } else {
      setErrors(undefined)
    }
    setIsLogging(false)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      {isLogging && <AppLoading />}
      <Stack
        py={6}
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
            py={3.5}
          >
            <Stack alignItems={'center'} pb={2} gap={1.5}>
              <Image
                src="/assets/images/logo-border.svg"
                width={108}
                height={108}
                alt=""
              />
              <Typography
                variant="h3"
                color={'secondary'}
                letterSpacing={'1px'}
              >
                Đăng nhập
              </Typography>
            </Stack>

            <form
              onSubmit={methods.handleSubmit(onSubmitHandler)}
              noValidate
              autoComplete="off"
            >
              <FormProvider {...methods}>
                <Stack gap={2}>
                  <Stack gap={1}>
                    <Typography variant="body1" color={'secondary'}>
                      Số điện thoại
                    </Typography>
                    <MuiRHFInputText
                      label={'Số điện thoại'}
                      required
                      type="text"
                      name="phoneNumber"
                      defaultValue=""
                      placeholder="Nhập số điện thoại"
                      autoFocus={true}
                    />
                  </Stack>

                  <Stack gap={1}>
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
                        <IconButton
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
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

                  <MuiButton
                    disabled={!_.isEmpty(methods.formState.errors)}
                    type="submit"
                    variant="contained"
                    loading={isLogging}
                    sx={{
                      color: '#FFD200',
                      width: '100%',
                      height: 48,
                      mt: 1,
                    }}
                    title="Đăng nhập"
                  />
                </Stack>
              </FormProvider>
            </form>
            <Stack my={3.5} gap={1.5}>
              <Typography
                variant="body1"
                color={'secondary'}
                textAlign="center"
              >
                Hoặc đăng nhập bằng
              </Typography>
              <Stack direction={'row'} gap={3} justifyContent="center">
                <Button
                  onClick={handleLoginFacebook}
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
      </Stack>

      <PopupNotification
        title={''}
        open={open}
        onCloseModal={handleClose}
        cancelText="Đóng"
      >
        <JustifyBox flexDirection={'column'} gap={4}>
          <Image
            src={'/assets/images/common/error.svg'}
            width={124}
            height={124}
            alt=""
          />
          <MuiTypography
            variant="subtitle2"
            fontSize={'1.125rem'}
            color={'secondary'}
          >
            {errors?.errorMsg}
          </MuiTypography>
        </JustifyBox>
      </PopupNotification>
    </>
  )
}
