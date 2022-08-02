import { IPost } from '@/models'
import axiosClient from './axios-client'

export const postsApi = {
  getPosts() {
    return axiosClient.get('/public/news/spotlight')
  },
}
export const fetchPosts = async (): Promise<IPost[]> => {
  console.log('get posts')
  const res = await axiosClient.get<IPost[], any>('/public/news/spotlight')
  // need to do this with fetch since doesn't automatically throw errors axios and graphql-request do
  return res
}
