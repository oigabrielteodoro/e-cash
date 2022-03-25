import { useQuery } from 'react-query'

import { api, decode } from 'client'

import { of } from 'fp-ts/Task'
import { pipe } from 'fp-ts/function'
import { isRight, toError } from 'fp-ts/Either'
import { tryCatch, map, mapLeft, fold } from 'fp-ts/TaskEither'

import { BankingInstitution, bankingInstitutionsCodec } from '../types'

async function getBankingInstitutions() {
  const url = '/banking_institutions'

  const response = await pipe(
    tryCatch(() => api.get<BankingInstitution[]>(url), toError),
    map((response) => response.data),
    mapLeft((error) => {
      throw new Error(error.message)
    }),
  )()

  if (!isRight(response)) return null

  return await pipe(
    tryCatch(() => decode(response.right, bankingInstitutionsCodec), toError),
    fold(
      () => of(null),
      () => of(response.right),
    ),
  )()
}

export function useBankingInstitutions() {
  const { data, ...rest } = useQuery({
    queryKey: 'bankingInstitutions',
    queryFn: getBankingInstitutions,
  })

  return {
    bankingInstitutions: data ?? [],
    ...rest,
  }
}
