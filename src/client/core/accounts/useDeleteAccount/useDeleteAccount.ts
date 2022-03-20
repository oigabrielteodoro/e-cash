import { useMutation, useQueryClient } from 'react-query'

import { api } from 'client'

type Options = {
  onSuccess: () => void
}

export function useDeleteAccount({ onSuccess }: Options) {
  const queryClient = useQueryClient()

  const { mutate: deleteAccount, ...rest } = useMutation<
    unknown,
    unknown,
    string
  >({
    mutationFn: (accountId) => api.delete(`/accounts/${accountId}`),
    onSuccess: async () => {
      onSuccess()

      await queryClient.invalidateQueries('accounts')
    },
  })

  return {
    deleteAccount,
    ...rest,
  }
}
