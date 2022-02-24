import React from 'react'
import { BiLineChartDown, BiLineChart } from 'react-icons/bi'
import { AiOutlineBank, AiOutlineCreditCard } from 'react-icons/ai'

import { AppLayout, Row, Col, Calendar } from 'ui'

import { Search } from './Search'
import { BalanceCard } from './BalanceCard'

export function Dashboard() {
  return (
    <AppLayout>
      <AppLayout.Header title='Dashboard'>
        <Row alignItems='center' gutter={[0, 0]} as='section'>
          <Calendar />
          <Search />
        </Row>
      </AppLayout.Header>
      <AppLayout.Content>
        <Row gutter={[24, 24]}>
          <Col span={6}>
            <BalanceCard
              title='Current balance'
              currentValue={10000}
              previousValue={7000}
              icon={AiOutlineBank}
            />
          </Col>
          <Col span={6}>
            <BalanceCard
              title='Incomes'
              currentValue={10000}
              previousValue={7000}
              icon={BiLineChart}
            />
          </Col>
          <Col span={6}>
            <BalanceCard
              title='Expenses'
              currentValue={5500}
              previousValue={10000}
              icon={BiLineChartDown}
            />
          </Col>
          <Col span={6}>
            <BalanceCard
              title='Credit Card'
              currentValue={150}
              previousValue={500}
              icon={AiOutlineCreditCard}
            />
          </Col>
        </Row>
      </AppLayout.Content>
    </AppLayout>
  )
}
