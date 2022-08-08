import { ILoginPayload } from '@/models'
import { http } from './http-config'

// export const authApi = {
//   async login(payload: ILoginPayload) {
//     return axiosClient.post('/login', payload)
//   },
//   logout() {
//     return axiosClient.post('/logout')
//   },
//   getProfile() {
//     return axiosClient.get('/profile')
//   },
// }
export const login = async (params: ILoginPayload): Promise<any> => {
  const { data } = await http.post<any>('/login', params)
  return data
}

export const getProfile = async (): Promise<any> => {
  const { data } = await http.get<any>('/profile')
  return data
}
