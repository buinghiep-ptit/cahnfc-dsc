import { ILoginPayload, IUserInfo } from '@/models'
import { http } from './http-config'

export const login = async (params: ILoginPayload): Promise<any> => {
  const { data } = await http.post<any>(
    '/auth/api/customer/authenticate',
    params,
  )
  return data
}

export const renewToken = async (
  params: Record<string, string>,
): Promise<any> => {
  const { data } = await http.post<any>('/login', params)
  return data
}

export const getProfile = async (): Promise<IUserInfo> => {
  const { data } = await http.get<IUserInfo>('/auth/api/customer/info')
  return data
}
