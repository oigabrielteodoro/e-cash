import { useQuery } from 'react-query'

import { api, getUserId } from 'client'

export function getMe() {
  return api.get('/profile')
}

export function useMe() {
  const user_id = getUserId()

  const { data, ...rest } = useQuery({
    queryKey: ['profile', { user_id }],
    queryFn: getMe,
    enabled: !!user_id,
  })

  return {
    user: data,
    ...rest,
  }
}
