import { useQuery } from 'react-query'

import { of } from 'fp-ts/Task'
import { pipe } from 'fp-ts/function'
import { isRight, toError } from 'fp-ts/Either'
import { tryCatch, map, mapLeft, fold } from 'fp-ts/TaskEither'

import { api, decode } from 'client'

import { Account, accountsCodec } from '../types'

async function getAccounts() {
  const url = '/accounts'

  const response = await pipe(
    tryCatch(() => api.get<Account[]>(url), toError),
    map((response) => response.data),
    mapLeft((error) => {
      throw new Error(error.message)
    }),
  )()

  if (!isRight(response)) return null

  return await pipe(
    tryCatch(() => decode(response.right, accountsCodec), toError),
    fold(
      () => of(null),
      () => of(response.right),
    ),
  )()
}

export function useAccounts() {
  const {
    data = [],
    isError,
    ...rest
  } = useQuery({
    queryKey: 'accounts',
    queryFn: getAccounts,
    select: (data) => {
      return data
        ? data.sort((account) => (account.includeSumOnDashboard ? -1 : 1))
        : []
    },
  })

  return {
    accounts: data ?? [],
    isEmpty: isError ? false : data?.length === 0,
    isError,
    ...rest,
  }
}
