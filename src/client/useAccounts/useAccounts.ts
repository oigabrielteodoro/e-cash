import { useMutation, useQuery, useQueryClient } from 'react-query'

import { api } from 'client/client'

import type { Account, AccountFormParams } from './types'

type UseCreateAccountParams = {
  onSuccess: () => void
}

function getAccounts() {
  return api.get<Account[]>('/accounts').then((response) => response.data)
}

export function useAccounts() {
  const { data = [], ...rest } = useQuery({
    queryKey: 'accounts',
    queryFn: getAccounts,
  })

  return {
    accounts: data,
    isEmpty: data.length === 0,
    ...rest,
  }
}

export function useCreateAccount({ onSuccess }: UseCreateAccountParams) {
  const queryClient = useQueryClient()

  const { mutate: createAccount, ...rest } = useMutation<
    unknown,
    unknown,
    AccountFormParams
  >({
    mutationFn: (data) => api.post('/accounts', data),
    onSuccess: async () => {
      await queryClient.invalidateQueries('accounts')

      onSuccess()
    },
  })

  return {
    createAccount,
    ...rest,
  }
}
