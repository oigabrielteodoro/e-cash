import { useMutation, useQueryClient } from 'react-query'

import { api } from 'client'

import type { UpdateAccountFormParams } from '../types'

type Options = {
  onSuccess?: () => void
}

export function useUpdateAccount({ onSuccess }: Options = {}) {
  const queryClient = useQueryClient()

  const { mutate: updateAccount, ...rest } = useMutation<
    unknown,
    unknown,
    UpdateAccountFormParams
  >({
    mutationFn: ({ accountId, ...rest }) =>
      api.put(`/accounts/${accountId}`, rest),
    onSuccess: async () => {
      await queryClient.invalidateQueries('accounts')

      onSuccess && onSuccess()
    },
  })

  return {
    updateAccount,
    ...rest,
  }
}
