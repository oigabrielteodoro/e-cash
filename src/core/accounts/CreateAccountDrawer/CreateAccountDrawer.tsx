import React, { useRef } from 'react'
import { AiOutlineBank } from 'react-icons/ai'

import { Button, Col, Drawer, notification, Row, Space, InfoBox } from 'ui'

import { AccountForm } from '../AccountForm'
import { AccountFormParams } from '../AccountForm/types'

type Props = {
  isOpen: boolean
  onClose: () => void
}

export function CreateAccountDrawer({ isOpen, onClose }: Props) {
  const formRef = useRef<HTMLButtonElement>(null)

  function handleOnSubmit(_: AccountFormParams) {
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
      <Row gutter={[0, 32]}>
        <Col span={24}>
          <InfoBox message='Your banking information is important for future open banking integration.' />
        </Col>

        <Col span={24}>
          <AccountForm formRef={formRef} onSubmit={handleOnSubmit} />
        </Col>
      </Row>
    </Drawer>
  )
}
