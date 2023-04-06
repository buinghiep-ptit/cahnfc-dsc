import { http } from './http-config'

export const fetchDataHome = async (section: string): Promise<any[]> => {
  const { data } = await http.get<any[]>(
    `/cahnfc/public/api/homepage/${section}`,
  )
  return data
}
