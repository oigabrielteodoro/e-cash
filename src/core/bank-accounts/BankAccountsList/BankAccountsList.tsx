import React from 'react'

import { CAIXA, NUBANK } from 'assets'
import { Col, Row } from 'ui'

import { BankAccount } from '../BankAccount'

export function BankAccountsList() {
  return (
    <Row as='ul' gutter={[24, 24]}>
      {[1, 2, 3, 4].map((account) => (
        <Col as='li' key={account} md={24} lg={12} xlg={8}>
          <BankAccount
            disabled={account > 2}
            name='Conta Nubank'
            bankName='NU PAGAMENTOS S.A'
            flag={account > 2 ? NUBANK : CAIXA}
          />
        </Col>
      ))}
    </Row>
  )
}
