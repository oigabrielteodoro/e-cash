import React, { useRef } from 'react'
import { AiOutlineBank } from 'react-icons/ai'

import { Button, Drawer, notification, Row, Space } from 'ui'

import { BankAccountForm } from '../BankAccountForm'
import { BankAccountFormParams } from '../BankAccountForm/types'

type Props = {
  isOpen: boolean
  onClose: () => void
}

export function CreateBankAccountDrawer({ isOpen, onClose }: Props) {
  const formRef = useRef<HTMLButtonElement>(null)

  function handleOnSubmit(_: BankAccountFormParams) {
    notification.success('Congratulations! Added bank account.')

    onClose()
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
            <h3>Add bank account</h3>
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
            <Button full={false} onClick={() => formRef.current?.click()}>
              To send
            </Button>
          </Row>
        </Space>
      }
    >
      <BankAccountForm formRef={formRef} onSubmit={handleOnSubmit} />
    </Drawer>
  )
}
