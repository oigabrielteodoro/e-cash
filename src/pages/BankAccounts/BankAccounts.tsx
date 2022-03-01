import React from 'react'
import { FiPlus } from 'react-icons/fi'
import {
  AiOutlineBank,
  AiOutlineBarChart,
  AiOutlineCreditCard,
  AiOutlineMore,
} from 'react-icons/ai'

import { AppLayout, Button, Calendar, Row, Grid, Space, Tooltip, Col } from 'ui'
import { BankAccountsList, BankAccountBalanceCard } from 'core/bank-accounts'
import { BiLineChart, BiLineChartDown } from 'react-icons/bi'

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
            <Button variant='primary' type='icon'>
              <AiOutlineMore size={20} />
            </Button>
          </Grid>
        </Row>
      </AppLayout.Header>
      <AppLayout.Content>
        <Row gutter={[24, 24]}>
          <Col span={6}>
            <BankAccountBalanceCard
              title='Current balance'
              currentValue={10000}
              previousValue={7000}
              icon={AiOutlineBank}
            />
          </Col>
          <Col span={6}>
            <BankAccountBalanceCard
              title='Incomes'
              currentValue={10000}
              previousValue={7000}
              icon={BiLineChart}
            />
          </Col>
          <Col span={6}>
            <BankAccountBalanceCard
              title='Expenses'
              currentValue={5500}
              previousValue={10000}
              icon={BiLineChartDown}
            />
          </Col>
          <Col span={6}>
            <BankAccountBalanceCard
              title='Credit Card'
              currentValue={150}
              previousValue={500}
              icon={AiOutlineCreditCard}
            />
          </Col>
          <Col span={18}>
            <BankAccountsList />
          </Col>
        </Row>
      </AppLayout.Content>
    </AppLayout>
  )
}
