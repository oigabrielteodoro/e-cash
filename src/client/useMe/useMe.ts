import { useQuery } from 'react-query'

import { api, getUserId } from 'client'

export function getMe() {
  return api.get('/profile')
}

export function useMe() {
  const user_id = getUserId()

  const { data, ...rest } = useQuery({
    enabled: !!user_id,
    queryKey: ['profile', { user_id }],
    queryFn: getMe,
  })

  return {
    user: data,
    ...rest,
  }
}
