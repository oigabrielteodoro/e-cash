import { useQuery } from 'react-query'

import { api, queryDefaultOptions, useSession } from 'client'

import type { UseMeResponse } from './types'

export function getMe() {
  return api.get<UseMeResponse>('/profile').then((response) => response.data)
}

export function useMe() {
  const { token, user_id } = useSession()

  const isEnabled = !!token && !!user_id

  const { data, ...rest } = useQuery({
    enabled: isEnabled,
    queryKey: ['profile', { user_id }],
    queryFn: getMe,
    ...queryDefaultOptions,
  })

  return {
    user: data?.user,
    ...rest,
  }
}
