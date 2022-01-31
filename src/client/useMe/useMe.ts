import { useQuery } from 'react-query'

import { authenticatedApi, useToken, useUserId } from 'client'

import type { UseMeResponse } from './types'

export function getMe() {
  return authenticatedApi
    .get<UseMeResponse>('/users/profile')
    .then((response) => response.data)
}

export function useMe() {
  const token = useToken()
  const user_id = useUserId()

  const isEnabled = !!token && !!user_id

  const { data, ...rest } = useQuery({
    retry: false,
    enabled: isEnabled,
    queryKey: ['profile', { user_id }],
    queryFn: getMe,
  })

  return {
    user: data?.user,
    ...rest,
  }
}
