import React from 'react'
import { HiOutlineCash } from 'react-icons/hi'
import { BiLineChart, BiLineChartDown } from 'react-icons/bi'
import { AiOutlineCreditCard } from 'react-icons/ai'

import { Col, Row } from 'ui'

import * as S from './CreationOptions.styled'

export function CreationOptions() {
  return (
    <S.Container>
      <Row gutter={[20, 0]}>
        <Col span={6}>
          <button aria-label='income'>
            <BiLineChart size={24} />
            Income
          </button>
        </Col>
        <Col span={6}>
          <button aria-label='expense'>
            <BiLineChartDown size={24} />
            Expense
          </button>
        </Col>
        <Col span={6}>
          <button aria-label='credit card'>
            <AiOutlineCreditCard size={24} />
            Credit card
          </button>
        </Col>
        <Col span={6}>
          <button aria-label='transaction'>
            <HiOutlineCash size={24} />
            Transaction
          </button>
        </Col>
      </Row>
    </S.Container>
  )
}
