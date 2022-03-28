import { useMutation, useQueryClient } from 'react-query'

import { api } from 'client'

import type { AccountFormParams } from '../types'

type Options = {
  onSuccess?: () => void
}

export function useCreateAccount({ onSuccess }: Options = {}) {
  const queryClient = useQueryClient()

  const { mutate: createAccount, ...rest } = useMutation<
    unknown,
    unknown,
    AccountFormParams
  >({
    mutationFn: (data) => api.post('/accounts', data),
    onSuccess: async () => {
      await queryClient.invalidateQueries('accounts')

      onSuccess && onSuccess()
    },
  })

  return {
    createAccount,
    ...rest,
  }
}
