import { IUserInfo } from '@/models'
import { AxiosResponse } from 'axios'
import { http } from './http-config'

type LoginPayload = {
  phoneNumber?: string
  password?: string
  returnRefreshToken?: boolean
}

type LoginSocialPayload = {
  platform?: 'GOOGLE' | 'FACEBOOK' | 'APPLE'
  token?: string
  idToken?: string
  fullName?: string
  lastName?: string
  firstName?: string
  returnRefreshToken?: boolean
}

type AuthResponse = {
  accessToken?: string
  expiresIn?: number
  created?: number
  tokenType?: string
  refreshToken?: string
}

export const login = async (params: LoginPayload): Promise<AuthResponse> => {
  const { data } = await http.post<LoginPayload, AxiosResponse<AuthResponse>>(
    '/auth/api/customer/authenticate',
    params,
  )
  return data
}

export const loginSocial = async (
  params: LoginSocialPayload,
): Promise<AuthResponse> => {
  const { data } = await http.post<
    LoginSocialPayload,
    AxiosResponse<AuthResponse>
  >('/auth/api/customer/oauth2', params)
  return data
}

export const logOut = async (): Promise<any> => {
  const { data } = await http.post<any>('/auth/api/customer/logout')
  return data
}

export const renewToken = async (params: {
  refreshToken?: string
}): Promise<AuthResponse> => {
  const { data } = await http.post<AuthResponse>(
    '/auth/api/customer/authenticate/refresh',
    params,
  )
  return data
}

export const getProfile = async (): Promise<IUserInfo> => {
  const { data } = await http.get<IUserInfo>('/auth/api/customer/profile')
  return data
}

// #SIGNUP
export const registerOTP = async (params: {
  phoneNumber?: string
}): Promise<{ verify?: string }> => {
  const { data } = await http.post<any, AxiosResponse<{ verify?: string }>>(
    '/auth/api/customer/register',
    params,
  )
  return data
}

export const validateOTP = async (params: {
  phoneNumber?: string
  otp?: string
}): Promise<{ accessToken?: string }> => {
  const { data } = await http.post<
    any,
    AxiosResponse<{ accessToken?: string }>
  >('/auth/api/customer/register/validate', params)
  return data
}

export const setPassword = async (params: {
  password?: string
  deviceId?: string
  returnRefreshToken?: boolean
}): Promise<AuthResponse> => {
  const { data } = await http.post<any, AxiosResponse<AuthResponse>>(
    '/auth/api/customer/register/password',
    params,
  )
  return data
}
