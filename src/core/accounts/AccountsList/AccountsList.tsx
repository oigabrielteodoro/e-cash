import React from 'react'

import { Col, Row, EmptyState, Button, Space } from 'ui'
import { useAccounts } from 'client'

import { AccountCard } from '../AccountCard'

type Props = {
  onOpenCreateAccountDrawer: () => void
}

export function AccountsList({ onOpenCreateAccountDrawer }: Props) {
  const { accounts, isEmpty } = useAccounts()

  if (isEmpty) {
    return (
      <EmptyState
        size='lg'
        title='No bank account found!'
        description="We couldn't find any bank accounts, try to add one first"
      >
        <Space margin='0 auto'>
          <Button full={false} onClick={onOpenCreateAccountDrawer}>
            Add bank account
          </Button>
        </Space>
      </EmptyState>
    )
  }

  return (
    <Row as='ul' gutter={[24, 24]}>
      {accounts.map((account) => (
        <Col as='li' key={account.id} md={24} lg={12} xlg={8}>
          <AccountCard
            disabled={!account.include_sum_on_dashboard}
            name={account.name}
            bankName={account.banking_institution?.institutionName ?? '-/-'}
            flag={account.banking_institution?.imageUrl}
            accountNumber={account.banking_account}
            agencyNumber={account.banking_agency}
            balance={account.balance}
          />
        </Col>
      ))}
    </Row>
  )
}
