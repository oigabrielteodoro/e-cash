import React from 'react'
import { FiPlus } from 'react-icons/fi'
import { AiOutlineBank, AiOutlineBarChart, AiOutlineMore } from 'react-icons/ai'

import { AppLayout, Button, Calendar, Row, Grid, Space, Tooltip, Col } from 'ui'
import { BankAccountsList, BankAccountBalanceCard } from 'core/bank-accounts'

export function BankAccounts() {
  return (
    <AppLayout>
      <AppLayout.Header title='Accounts'>
        <Row as='section' alignItems='center'>
          <Space marginRight='2.4rem'>
            <Calendar />
          </Space>

          <Grid columns={3} gutter={[8, 0]}>
            <Tooltip message='New account' position='bottom'>
              <Button variant='primary' type='icon'>
                <FiPlus size={20} />
              </Button>
            </Tooltip>
            <Tooltip message='Balance projection' position='bottom'>
              <Button variant='primary' type='icon'>
                <AiOutlineBarChart size={20} />
              </Button>
            </Tooltip>
            <Tooltip message='More' position='bottom'>
              <Button variant='primary' type='icon'>
                <AiOutlineMore size={20} />
              </Button>
            </Tooltip>
          </Grid>
        </Row>
      </AppLayout.Header>
      <AppLayout.Content>
        <Row gutter={[32, 0]}>
          <Col lg={18} xlg={19}>
            <BankAccountsList />
          </Col>
          <Col lg={6} xlg={5}>
            <Grid columns={1} gutter={[0, 32]}>
              <BankAccountBalanceCard
                title='Current balance'
                currentValue={10000}
                previousValue={7000}
                icon={AiOutlineBank}
              />
              <BankAccountBalanceCard
                title='Balance projection'
                currentValue={10000}
                previousValue={7000}
                icon={AiOutlineBank}
              />
            </Grid>
          </Col>
        </Row>
      </AppLayout.Content>
    </AppLayout>
  )
}
