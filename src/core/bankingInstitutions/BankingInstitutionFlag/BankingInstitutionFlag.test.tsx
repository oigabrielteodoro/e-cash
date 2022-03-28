import React from 'react'

import { render, screen } from '__helpers__/app-tests'
import { bankingInstitutionFactory } from '__factories__'

import { BankingInstitutionFlag } from './BankingInstitutionFlag'

const bankingInstitution = bankingInstitutionFactory.build()

describe('BankingInstitutionFlag', () => {
  it('should be able render correctly', () => {
    render(
      <BankingInstitutionFlag
        imageUrl={bankingInstitution.imageUrl}
        institutionName={bankingInstitution.institutionName}
      />,
    )

    expect(
      screen.getByAltText(bankingInstitution.institutionName),
    ).toBeInTheDocument()
  })

  it('should be able render disabled correctly', () => {
    render(<BankingInstitutionFlag />)

    expect(screen.getByLabelText('institution unknown')).toBeInTheDocument()
  })
})
