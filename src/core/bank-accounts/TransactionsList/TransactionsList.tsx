import React from 'react'
import { FiDollarSign } from 'react-icons/fi'
import { MdOutlineFastfood } from 'react-icons/md'

import { Card } from 'ui'

import * as S from './TransactionsList.styled'

export function TransactionsList() {
  return (
    <Card>
      <strong>Pending transactions</strong>
      <S.List>
        <li>
          <S.TransactionIcon>
            <MdOutlineFastfood size={20} />
          </S.TransactionIcon>
          <S.TransactionInfo>
            <strong>Mc Donalds</strong>
            <small>-R$ 50,00</small>
          </S.TransactionInfo>
        </li>
        <li>
          <S.TransactionIcon>
            <FiDollarSign size={20} />
          </S.TransactionIcon>
          <S.TransactionInfo>
            <strong>Salário</strong>
            <small>+R$ 10,000.00</small>
          </S.TransactionInfo>
        </li>
      </S.List>
    </Card>
  )
}
