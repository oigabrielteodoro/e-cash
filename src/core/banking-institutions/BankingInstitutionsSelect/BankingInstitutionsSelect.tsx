import React from 'react'

import { useBankingInstitutions } from 'client'

import { Select, SelectProps } from 'ui'

import * as S from './BankingInstitutionsSelect.styled'

export function BankingInstitutionsSelect(
  props: Omit<SelectProps, 'children'>,
) {
  const { bankingInstitutions = [], isLoading } = useBankingInstitutions()

  console.log(isLoading)

  return (
    <Select loading={isLoading} renderOptionElementWhenIsSelected {...props}>
      {bankingInstitutions.map((bankingInstitution) => (
        <Select.Option
          key={bankingInstitution.id}
          displayValue={bankingInstitution.name}
          value={bankingInstitution.id.toString()}
        >
          <S.BankingInstitutionOption>
            <img
              src={bankingInstitution.imageUrl}
              alt={bankingInstitution.name}
            />
            {bankingInstitution.name}
          </S.BankingInstitutionOption>
        </Select.Option>
      ))}
    </Select>
  )
}
