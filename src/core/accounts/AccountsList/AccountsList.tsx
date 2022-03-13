import React from 'react'

import { Col, Row } from 'ui'
import { useAccounts } from 'client'

import { AccountCard } from '../AccountCard'
import { Empty } from './Empty'
import { Failure } from './Failure'
import { Loading } from './Loading'

type Props = {
  onOpenCreateAccountDrawer: () => void
}

export function AccountsList({ onOpenCreateAccountDrawer }: Props) {
  const { accounts, isEmpty, isError, isRefetching, isLoading, refetch } =
    useAccounts()

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <Failure isLoading={isRefetching} onTryAgain={refetch} />
  }

  if (isEmpty) {
    return <Empty onOpenCreateAccountDrawer={onOpenCreateAccountDrawer} />
  }

  return (
    <Row as='ul' gutter={[24, 24]}>
      {accounts.map((account) => (
        <Col as='li' key={account.id} md={24} lg={12} xlg={8}>
          <AccountCard
            disabled={!account.includeSumOnDashboard}
            name={account.name}
            bankName={account.bankingInstitution?.institutionName ?? '--'}
            flag={account.bankingInstitution?.imageUrl}
            accountNumber={account.accountNumber}
            agencyNumber={account.agencyNumber}
            balance={account.balance}
          />
        </Col>
      ))}
    </Row>
  )
}
