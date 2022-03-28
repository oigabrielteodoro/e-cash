import { useMutation, useQueryClient } from 'react-query'

import { api } from 'client'

type Options = {
  onError?: () => void
  onSuccess?: () => void
}

export function useDeleteAccount({ onSuccess, onError }: Options = {}) {
  const queryClient = useQueryClient()

  const { mutate: deleteAccount, ...rest } = useMutation<
    unknown,
    unknown,
    string
  >({
    onError,
    mutationFn: (accountId) => api.delete(`/accounts/${accountId}`),
    onSuccess: async () => {
      onSuccess && onSuccess()

      await queryClient.invalidateQueries('accounts')
    },
  })

  return {
    deleteAccount,
    ...rest,
  }
}
