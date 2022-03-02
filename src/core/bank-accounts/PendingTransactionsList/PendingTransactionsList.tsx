import React from 'react'
import { FiCheckCircle, FiDollarSign } from 'react-icons/fi'
import { MdOutlineFastfood } from 'react-icons/md'

import { Button, Card, Space, Tooltip } from 'ui'
import { theme } from 'config'

import * as S from './PendingTransactionsList.styled'

export function PendingTransactionsList() {
  return (
    <Card>
      <S.Title>
        Pending transactions
        <Tooltip message='50 pending transactions' position='top'>
          <S.AmountText>(50)</S.AmountText>
        </Tooltip>
      </S.Title>
      <S.List>
        <li>
          <Tooltip message='Food' position='left'>
            <S.TransactionIcon>
              <MdOutlineFastfood size={20} />
            </S.TransactionIcon>
          </Tooltip>
          <S.TransactionInfo>
            <strong>Food</strong>
            <small>-R$ 50,00</small>
          </S.TransactionInfo>
          <Space marginLeft='auto'>
            <Button type='text' full={false}>
              <Tooltip message='Pay' position='left'>
                <FiCheckCircle color={theme.colors.neutral[500]} size={18} />
              </Tooltip>
            </Button>
          </Space>
        </li>
        <li>
          <Tooltip message='Money' position='left'>
            <S.TransactionIcon>
              <FiDollarSign size={20} />
            </S.TransactionIcon>
          </Tooltip>
          <S.TransactionInfo>
            <strong>Salary</strong>
            <small>+R$ 10,000.00</small>
          </S.TransactionInfo>
          <Space marginLeft='auto'>
            <Button type='text' full={false}>
              <Tooltip message='Pay' position='left'>
                <FiCheckCircle color={theme.colors.neutral[500]} size={18} />
              </Tooltip>
            </Button>
          </Space>
        </li>
      </S.List>
      <Button>See more</Button>
    </Card>
  )
}
