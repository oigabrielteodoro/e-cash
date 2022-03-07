import React from 'react'
import { AiOutlineBank, AiOutlineCreditCard } from 'react-icons/ai'
import { BiLineChart, BiLineChartDown } from 'react-icons/bi'

import { Col } from 'ui'

import { AccountBalanceCard } from '..'

export function AccountsSummary() {
  return (
    <>
      <Col span={6}>
        <AccountBalanceCard
          title='Current balance'
          currentValue={10000}
          previousValue={7000}
          icon={AiOutlineBank}
        />
      </Col>
      <Col span={6}>
        <AccountBalanceCard
          title='Incomes'
          currentValue={10000}
          previousValue={7000}
          icon={BiLineChart}
        />
      </Col>
      <Col span={6}>
        <AccountBalanceCard
          title='Expenses'
          currentValue={5500}
          previousValue={10000}
          icon={BiLineChartDown}
        />
      </Col>
      <Col span={6}>
        <AccountBalanceCard
          title='Credit Card'
          currentValue={150}
          previousValue={500}
          icon={AiOutlineCreditCard}
        />
      </Col>
    </>
  )
}
