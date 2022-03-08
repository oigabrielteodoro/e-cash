import { useQuery } from 'react-query'

import { api } from 'client'

import type { BankingInstitution } from './types'

async function getBankingInstitutions() {
  return api
    .get<BankingInstitution[]>('/bankingInstitutions')
    .then((response) => response.data)
}

export function useBankingInstitutions() {
  const { data = [], ...rest } = useQuery({
    queryKey: 'bankingInstitutions',
    queryFn: getBankingInstitutions,
  })

  return {
    bankingInstitutions: data,
    ...rest,
  }
}
