/* eslint-disable import/no-unresolved */
import { MuiRHFCheckBox } from '@/components/commons/MuiRHFCheckBox'
import { MuiRHFInputText } from '@/components/commons/MuiRHFTextInput'
import { OtpInput } from '@/components/commons/otp-input'
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
import Image from 'next/image'
import * as React from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import * as Yup from 'yup'

export interface IProps {}

type SchemaType = {
  mobilePhone?: string
  password?: string
  passwordConfirmation?: string
}

export default function SignUp(props: IProps) {
  const [otp, setOtp] = React.useState('')
  const [step, setStep] = React.useState(1)
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
    password: Yup.string()
      .required('messages.MSG1')
      .test('latinChars', 'messages.MSG21', value => {
        const regexStr = /^[\x20-\x7E]+$/
        if (value) {
          return regexStr.test(value)
        } else return false
      })
      .matches(/^\S*$/, 'messages.MSG21')
      .matches(/^(?=.*?[a-z])(?=.*?[0-9]).{8,32}$/g, 'messages.MSG20'),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'messages.MSG11')
      .required('messages.MSG1'),
  })

  const methods = useForm({
    defaultValues: {},
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  })

  const handleClickShowPassword = () => {
    setShowPassword(prev => ({
      ...prev,
      visibility: !prev.visibility,
    }))
  }

  const onSubmitHandler: SubmitHandler<SchemaType> = (values: SchemaType) => {
    console.log(values)
    setStep(step + 1)
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
          <Stack alignItems={'center'} pb={3} gap={2}>
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
              <Stack gap={2.5}>
                {step === 1 && (
                  <>
                    <Stack gap={1.5}>
                      <Typography variant="body1" color={'secondary'}>
                        Sử dụng số điện thoại để đăng ký tài khoản
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
                      <span style={{ fontWeight: 500 }}> 094******4</span>
                    </Typography>
                    <OtpInput
                      value={otp}
                      onChange={val => {
                        setOtp(val)
                      }}
                    />
                    <Typography variant="body1" color={'secondary'}>
                      Chưa nhận được mã OTP?{' '}
                      <span style={{ fontWeight: 500 }}>Gửi lại sau: 30s</span>
                    </Typography>
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

                <Button
                  // type="submit"
                  onClick={() => setStep(step + 1)}
                  variant="contained"
                  sx={{
                    color: '#FFD200',
                    width: '100%',
                    height: 48,
                    mt: 1.5,
                  }}
                >
                  {step === 1 ? 'Đăng ký' : 'Tiếp tục'}
                </Button>
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
                  onClick={() => {}}
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
            <Typography
              variant="body1"
              sx={{ color: '#ED1E24', fontWeight: 600, mt: 4 }}
              textAlign="center"
            >
              Thay đổi số điện thoại
            </Typography>
          )}
          {step === 3 && (
            <Stack
              bgcolor={'#FFF5F5'}
              px={3}
              py={1.5}
              borderRadius={2}
              gap={1}
              mt={4}
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
  )
}
