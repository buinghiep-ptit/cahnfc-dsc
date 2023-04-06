import { http } from './http-config'

export const fetchDataHome = async (section: string): Promise<any[]> => {
  const { data } = await http.get<any[]>(
    `/cahnfc/api/public/homepage/${section}`,
  )
  return data
}
