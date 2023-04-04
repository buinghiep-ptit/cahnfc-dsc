/* eslint-disable import/no-unresolved */
import { registerOTP, resendOTP, setPassword, validateOTP } from '@/api-client'
import AppLoading from '@/components/commons/AppLoading'
import { MuiButton } from '@/components/commons/MuiButton'
import { MuiRHFCheckBox } from '@/components/commons/MuiRHFCheckBox'
import { MuiRHFInputText } from '@/components/commons/MuiRHFTextInput'
import { MuiTypography } from '@/components/commons/MuiTypography'
import { OtpInput } from '@/components/commons/otp-input'
import { PopupNotification } from '@/components/commons/PopupNotification'
import { JustifyBox } from '@/components/home/CAHNTV'
import { getMessageString } from '@/helpers/messageToString'
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
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import * as React from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import * as Yup from 'yup'

export interface IProps {}

type SchemaType = {
  phoneNumber?: string
  password?: string
  passwordConfirmation?: string
  isAgree?: boolean
}

export default function SignUp(props: IProps) {
  const router = useRouter()
  const { next } = router.query
  const [otp, setOtp] = React.useState('')
  const [step, setStep] = React.useState(1)
  const [isLoading, setIsLoading] = React.useState(false)
  const [errors, setErrors] = React.useState<{ errorMsg?: string }>()
  const [showPassword, setShowPassword] = React.useState<{
    visibility: boolean
  }>({
    visibility: false,
  })
  const [open, setOpen] = React.useState(false)
  const [countDown, setCountDown] = React.useState(60)

  const inputRef = React.useRef<any>(null)

  React.useEffect(() => {
    if (!inputRef.current || !inputRef) return
    const timeout = setTimeout(() => {
      inputRef.current.focus()
    }, 100)

    return () => {
      clearTimeout(timeout)
    }
  }, [])

  React.useEffect(() => {
    if (step !== 2) {
      setCountDown(60)
      return
    }
    const interval = setInterval(() => {
      if (!!countDown) setCountDown(countDown - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [countDown, step])

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
      .required('messages.MSG1'),
    password:
      step === 3
        ? Yup.string()
            .required('Giá trị bắt buộc')
            .test('latinChars', 'Mật khẩu không hợp lệ', value => {
              const regexStr = /^[\x20-\x7E]+$/
              if (value) {
                return regexStr.test(value)
              } else return false
            })
            .matches(/^\S*$/, 'Mật khẩu không hợp lệ')
            .matches(
              /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!~*@^&])[A-Za-z0-9!~*@^&]{8,32}$/g,
              'Mật khẩu không hợp lệ',
            )
        : Yup.string().notRequired(),
    passwordConfirmation:
      step === 3
        ? Yup.string()
            .oneOf(
              [Yup.ref('password'), null],
              'Nhập lại mật khẩu chưa chính xác',
            )
            .required('Giá trị bắt buộc')
        : Yup.string().notRequired(),
  })

  const methods = useForm({
    defaultValues: { isAgree: false, phoneNumber: '' },
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  })

  const isAgree = methods.watch('isAgree')
  const phoneNumber = methods.watch('phoneNumber')

  const handleLoginFacebook = async () => {
    setIsLoading(true)

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
    setIsLoading(false)
  }

  const handleLoginGoogle = async () => {
    setIsLoading(true)
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
    setIsLoading(false)
  }

  const handleClickShowPassword = () => {
    setShowPassword(prev => ({
      ...prev,
      visibility: !prev.visibility,
    }))
  }

  const onSubmitHandler: SubmitHandler<SchemaType> = async (
    values: SchemaType,
  ) => {
    try {
      if (step === 1) {
        const result = await registerOTP({ phoneNumber: values.phoneNumber })
      } else if (step === 2) {
        const result = await validateOTP({
          phoneNumber: values.phoneNumber,
          otp: otp,
        })
      } else {
        const result = await setPassword({
          password: values.password,
          deviceId: '451796cc-9e5f-4424-8bf8-c1e6040b6d47',
          returnRefreshToken: true,
        })

        router.push('/')
      }
      setStep(step + 1)
    } catch (error) {
      const msgStr = getMessageString(error as any)
      setErrors(prev => ({
        ...prev,
        errorMsg: msgStr,
      }))
      setOpen(true)
    }
  }

  const handleGoBack = () => {
    if (step === 1) {
      router.push('/')
      return
    }
    setStep(step - 1)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const getStepLabel = (step: number) => {
    switch (step) {
      case 1:
        return 'Đăng ký'
      case 2:
        return 'Xác nhận tài khoản'
      case 3:
        return 'Thiết lập mật khẩu'

      default:
        return ''
    }
  }

  const resendOTPRegister = async () => {
    await resendOTP({ phone: phoneNumber, otpType: 'REGISTER' })
  }

  return (
    <>
      {isLoading && <AppLoading />}

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
          <IconButton
            onClick={handleGoBack}
            sx={{ position: 'absolute', top: 0, left: 20 }}
          >
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
            display={'flex'}
            flexDirection="column"
            justifyContent="center"
          >
            <Stack alignItems={'center'} pb={1} gap={2}>
              <Image
                src="/assets/images/logo-border.svg"
                width={108}
                height={108}
                alt=""
              />
              <Typography variant="h3" color={'secondary'}>
                {getStepLabel(step ?? 0)}
              </Typography>
            </Stack>

            <form
              onSubmit={methods.handleSubmit(onSubmitHandler)}
              noValidate
              autoComplete="off"
            >
              <FormProvider {...methods}>
                <Stack gap={2}>
                  {step === 1 && (
                    <>
                      <Stack gap={1.5}>
                        <Typography variant="body1" color={'secondary'}>
                          Sử dụng số điện thoại để đăng ký tài khoản
                        </Typography>
                        <MuiRHFInputText
                          inputRef={inputRef}
                          label={'Số điện thoại'}
                          required
                          type="text"
                          name="phoneNumber"
                          defaultValue=""
                          placeholder="Nhập số điện thoại"
                          autoFocus
                        />
                      </Stack>
                      <Stack direction={'row'} gap={2} alignItems="flex-start">
                        <MuiRHFCheckBox
                          name="isAgree"
                          label={
                            <Typography variant="body1" color={'secondary'}>
                              Bằng việc đăng ký, bạn đã đồng ý với CAHN FC về{' '}
                              <span style={{ fontWeight: 500 }}>
                                Điều khoản sử dụng{' '}
                              </span>{' '}
                              và{' '}
                              <span style={{ fontWeight: 500 }}>
                                Chính sách bảo mật!
                              </span>
                            </Typography>
                          }
                        />
                      </Stack>
                    </>
                  )}
                  {step === 2 && (
                    <JustifyBox flexDirection={'column'} gap={6}>
                      <Typography variant="body1" color={'secondary'}>
                        Nhập mã xác thực gồm 6 ký tự được gửi đến số điện thoại{' '}
                        <span style={{ fontWeight: 500 }}>
                          {phoneNumber.slice(0, 3) +
                            '******' +
                            phoneNumber.slice(9)}
                        </span>
                      </Typography>
                      <OtpInput
                        value={otp}
                        onChange={val => {
                          setOtp(val)
                        }}
                      />
                      <Button
                        disabled={!!countDown}
                        onClick={resendOTPRegister}
                        variant="text"
                        sx={{ textTransform: 'inherit' }}
                      >
                        <Typography variant="body1" color={'secondary'}>
                          Chưa nhận được mã OTP?{' '}
                          <span
                            style={{
                              fontWeight: 500,
                              color: countDown ? 'inherit' : '#ED1E24',
                            }}
                          >
                            {countDown
                              ? `Gửi lại sau: ${countDown}s`
                              : 'Gửi lại'}
                          </span>
                        </Typography>
                      </Button>
                    </JustifyBox>
                  )}

                  {step === 3 && (
                    <>
                      <Stack gap={1.5}>
                        <Typography variant="body1" color={'secondary'}>
                          Nhập mật khẩu
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

                      <Stack gap={1.5}>
                        <Typography variant="body1" color={'secondary'}>
                          Nhập lại mật khẩu
                        </Typography>
                        <MuiRHFInputText
                          label={'Nhập lại mật khẩu'}
                          type={showPassword.visibility ? 'text' : 'password'}
                          name="passwordConfirmation"
                          defaultValue=""
                          placeholder="Nhập lại mật khẩu"
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
                    </>
                  )}

                  <MuiButton
                    disabled={
                      (step === 1 && (!isAgree || !phoneNumber)) ||
                      (step === 2 && otp.length < 6) ||
                      !_.isEmpty(methods.formState.errors)
                    }
                    loading={false}
                    type="submit"
                    sx={{
                      color: '#FFD200',
                      width: '100%',
                      height: 48,
                      mt: 1.5,
                    }}
                    title={step === 1 ? 'Đăng ký' : 'Tiếp tục'}
                  />
                </Stack>
              </FormProvider>
            </form>
            {step === 1 && (
              <Stack mt={4} gap={2}>
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
            )}
            {step === 2 && (
              <Button
                variant="text"
                onClick={() => setStep(1)}
                sx={{ textTransform: 'inherit', mt: 2, p: 0 }}
              >
                <Typography
                  variant="body1"
                  sx={{ color: '#ED1E24', fontWeight: 600 }}
                  textAlign="center"
                >
                  Thay đổi số điện thoại
                </Typography>
              </Button>
            )}
            {step === 3 && (
              <Stack
                bgcolor={'#FFF5F5'}
                px={3}
                py={1.5}
                borderRadius={2}
                gap={1}
                mt={2}
              >
                <Typography
                  variant="subtitle1"
                  color={'secondary'}
                  sx={{ fontWeight: 500 }}
                >
                  Quy định về mật khẩu
                </Typography>
                <Typography
                  variant="subtitle1"
                  color={'secondary'}
                  sx={{ fontWeight: 400 }}
                >
                  1. Từ 8 đến 32 ký tự
                </Typography>
                <Typography
                  variant="subtitle1"
                  color={'secondary'}
                  sx={{ fontWeight: 400 }}
                >
                  2. Chứa các kí tự thuộc tất cả các nhóm sau:
                </Typography>
                <Stack direction={'row'} gap={2}>
                  <Typography
                    variant="subtitle1"
                    color={'secondary'}
                    sx={{ fontWeight: 400, flex: 1 }}
                  >
                    a. Ký tự tiếng Anh viết hoa (A-Z) <br />
                    b. Ký tự tiếng Anh viết thường (a-z)
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color={'secondary'}
                    sx={{ fontWeight: 400, flex: 1 }}
                  >
                    c. Ký tự số (0-9)
                    <br /> d. Ký tự đặc biệt (!~*@^&)
                  </Typography>
                </Stack>
              </Stack>
            )}
          </Box>
        </Container>
      </JustifyBox>

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
