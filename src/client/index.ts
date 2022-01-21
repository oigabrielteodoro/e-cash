import axios from 'axios'

import { getToken } from '.'

export const api = axios.create({
  baseURL: 'http://localhost:3333/api',
  headers: {
    authentication: `Bearer ${getToken()}`,
  },
})

export * from './types'
export * from './useMe'
export * from './useSession'
