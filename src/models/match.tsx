import { IRank } from './ranking'

export interface IMatch {
  id?: number
  dateStart?: string
  stadium?: string
  league?: string
  teams?: IRank[]
  status?: number
}
