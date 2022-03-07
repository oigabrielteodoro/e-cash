import { useQuery } from 'react-query'

import { api } from 'client'

import type { BankingInstitution } from './types'

async function getBankingInstitutions() {
  return api
    .get<BankingInstitution[]>('/banking_institutions')
    .then((response) => response.data)
}

export function useBankingInstitutions() {
  const { data, ...rest } = useQuery({
    queryKey: 'banking_institutions',
    queryFn: getBankingInstitutions,
  })

  return {
    bankingInstitutions: data,
    ...rest,
  }
}
