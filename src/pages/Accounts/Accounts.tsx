import React, { useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import { AiOutlineBarChart, AiOutlineMore } from 'react-icons/ai'

import { AppLayout, Button, Calendar, Row, Grid, Space, Tooltip, Col } from 'ui'
import {
  AccountsList,
  AccountsSummary,
  CreateAccountDrawer,
  PendingTransactionsList,
} from 'core/accounts'

export function Accounts() {
  const [isCreateAccountDrawerVisible, setIsCreateAccountDrawerVisible] =
    useState(false)

  return (
    <AppLayout>
      <AppLayout.Header title='Accounts'>
        <Row as='section' alignItems='center'>
          <Space marginRight='2.4rem'>
            <Calendar />
          </Space>

          <Grid columns={3} gutter={[8, 0]}>
            <Tooltip message='New account' position='bottom'>
              <Button
                type='icon'
                variant='primary'
                onClick={() => setIsCreateAccountDrawerVisible(true)}
              >
                <FiPlus size={20} />
              </Button>
            </Tooltip>
            <Tooltip message='Balance projection' position='bottom'>
              <Button variant='primary' type='icon'>
                <AiOutlineBarChart size={20} />
              </Button>
            </Tooltip>
            <Button variant='primary' type='icon'>
              <AiOutlineMore size={20} />
            </Button>
          </Grid>
        </Row>
      </AppLayout.Header>
      <AppLayout.Content>
        <Row gutter={[24, 24]}>
          <AccountsSummary />
          <Col span={18}>
            <AccountsList
              onOpenCreateAccountDrawer={() =>
                setIsCreateAccountDrawerVisible(true)
              }
            />
          </Col>
          <Col span={6}>
            <PendingTransactionsList />
          </Col>
        </Row>
      </AppLayout.Content>

      <CreateAccountDrawer
        isOpen={isCreateAccountDrawerVisible}
        onClose={() => setIsCreateAccountDrawerVisible(false)}
      />
    </AppLayout>
  )
}
