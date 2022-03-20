import { useQuery } from 'react-query'

import { api, useSessionStoraged } from 'client'

import type { UseMeResponse } from '../types'

export function getMe() {
  return api.get<UseMeResponse>('/profile').then((response) => response.data)
}

export function useMe() {
  const { token, userId } = useSessionStoraged()

  const isEnabled = !!token && !!userId

  const { data, ...rest } = useQuery({
    enabled: isEnabled,
    queryKey: ['profile', { userId }],
    queryFn: getMe,
  })

  return {
    user: data?.user,
    ...rest,
  }
}
