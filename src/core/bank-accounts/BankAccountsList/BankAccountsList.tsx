import React, { useState } from 'react'

import { CAIXA, NUBANK } from 'assets'
import { Col, Row, EmptyState, Button, Space } from 'ui'

import { BankAccount } from '../BankAccount'

type Props = {
  onOpenCreateBankAccountDrawer: () => void
}

export function BankAccountsList({ onOpenCreateBankAccountDrawer }: Props) {
  const [bankAccounts] = useState<number[]>([])

  const isEmpty = bankAccounts.length <= 0

  if (isEmpty) {
    return (
      <EmptyState
        size='lg'
        title='No bank account found!'
        description="We couldn't find any bank accounts, try to add one first"
      >
        <Space margin='0 auto'>
          <Button full={false} onClick={onOpenCreateBankAccountDrawer}>
            Add bank account
          </Button>
        </Space>
      </EmptyState>
    )
  }

  return (
    <Row as='ul' gutter={[24, 24]}>
      {bankAccounts.map((account) => (
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
