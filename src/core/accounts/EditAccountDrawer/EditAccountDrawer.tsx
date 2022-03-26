import React, { useRef } from 'react'
import { AiOutlineBank } from 'react-icons/ai'

import { Button, Col, Drawer, notification, Row, Space, InfoBox } from 'ui'
import { useCreateAccount } from 'client'

import type { AccountFormParams, Account } from 'client'

import { AccountForm } from '../AccountForm'

type Props = {
  isOpen: boolean
  account: Account
  onClose: () => void
}

export function EditAccountDrawer({ isOpen, account, onClose }: Props) {
  const formRef = useRef<HTMLButtonElement>(null)

  const initialValues: AccountFormParams = {
    name: account.name,
    bankingInstitutionId: account.bankingInstitutionId,
    balance: account.balance,
    accountNumber: account.accountNumber,
    agencyNumber: account.agencyNumber,
    category: account.category,
    includeSumOnDashboard: account.includeSumOnDashboard,
  }

  const { createAccount, isLoading } = useCreateAccount({
    onSuccess: () => {
      notification.success('Congratulations! Your account been edited.')
      onClose()
    },
  })

  function handleOnSubmit(params: AccountFormParams) {
    createAccount(params)
  }

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      width={700}
      header={
        <Row alignItems='center'>
          <AiOutlineBank size={28} />
          <Space marginLeft='1.6rem'>
            <h3>Edit bank account</h3>
          </Space>
        </Row>
      }
      footer={
        <Space marginLeft='auto'>
          <Row alignItems='center'>
            <Space marginRight='1.6rem'>
              <Button full={false} variant='outline' onClick={onClose}>
                Cancel
              </Button>
            </Space>
            <Button
              full={false}
              loading={isLoading}
              onClick={() => formRef.current?.click()}
            >
              To save
            </Button>
          </Row>
        </Space>
      }
    >
      <Row gutter={[0, 32]}>
        <Col span={24}>
          <InfoBox message='Your banking information is important for future open banking integration.' />
        </Col>

        <Col span={24}>
          <AccountForm
            isDisabled
            formRef={formRef}
            initialValues={initialValues}
            onSubmit={handleOnSubmit}
          />
        </Col>
      </Row>
    </Drawer>
  )
}
