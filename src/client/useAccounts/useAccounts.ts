import { useMutation, useQuery, useQueryClient } from 'react-query'

import { of } from 'fp-ts/Task'
import { pipe } from 'fp-ts/function'
import { isRight, toError } from 'fp-ts/Either'
import { tryCatch, map, fold } from 'fp-ts/TaskEither'

import { api, decode } from 'client'

import { accountsSchema, Account, AccountFormParams } from './types'

type UseCreateAccountParams = {
  onSuccess: () => void
}

async function getAccounts() {
  const url = '/accounts'

  const response = await pipe(
    tryCatch(() => api.get<Account[]>(url), toError),
    map((response) => response.data),
  )()

  if (!isRight(response)) return null

  return await pipe(
    tryCatch(() => decode(response.right, accountsSchema), toError),
    fold(
      () => of(null),
      () => of(response.right),
    ),
  )()
}

export function useAccounts() {
  const { data = [], ...rest } = useQuery({
    queryKey: 'accounts',
    queryFn: getAccounts,
  })

  return {
    accounts: data ?? [],
    isEmpty: data?.length === 0,
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
