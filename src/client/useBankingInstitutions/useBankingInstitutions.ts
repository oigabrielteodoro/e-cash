import { useQuery } from 'react-query'

import { api } from 'client'

import { of } from 'fp-ts/Task'
import { pipe } from 'fp-ts/function'
import { fromNullable } from 'fp-ts/Option'
import { isRight, toError } from 'fp-ts/Either'
import { tryCatch, map, fold } from 'fp-ts/TaskEither'

import { decode } from 'client/decode'

import { BankingInstitution, bankingInstitutionsSchema } from './types'

async function getBankingInstitutions() {
  const url = '/banking_institutions'

  const response = await pipe(
    tryCatch(() => api.get<BankingInstitution[]>(url), toError),
    map((response) => response.data),
  )()

  if (!isRight(response)) return null

  return await pipe(
    tryCatch(() => decode(response.right, bankingInstitutionsSchema), toError),
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
    bankingInstitutions: fromNullable(data),
    ...rest,
  }
}
