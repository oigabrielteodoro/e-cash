import axios from 'axios'

import { baseURL } from 'config'

import { getToken } from '.'

export const api = axios.create({
  baseURL,
})

export const authenticatedApi = axios.create({
  baseURL,
  headers: {
    authorization: `Bearer ${getToken()}`,
  },
})

export * from './types'
export * from './useMe'
export * from './useSession'
