import React from 'react'
import { FiDollarSign } from 'react-icons/fi'
import { AiOutlineEdit, AiOutlineMore } from 'react-icons/ai'
import { MdOutlineFastfood } from 'react-icons/md'

import { Button, Row, Tooltip } from 'ui'
import { theme } from 'config'

import * as S from './LastTransactionsList.styled'

export function LastTransactionsList() {
  return (
    <ul>
      <S.ListItem>
        <Tooltip message='Food' position='left'>
          <S.TransactionIcon>
            <MdOutlineFastfood size={20} />
          </S.TransactionIcon>
        </Tooltip>
        <S.TransactionInfo type='debit'>
          <strong>Food</strong>
          <small>-R$ 50,00</small>
        </S.TransactionInfo>
        <Row marginLeft='auto' columnGap='0.4rem'>
          <Tooltip message='Edit transaction' position='left'>
            <Button size='sm' type='icon' variant='ghost' full={false}>
              <AiOutlineEdit color={theme.colors.neutral[500]} size={18} />
            </Button>
          </Tooltip>
          <Tooltip message='Show more' position='right'>
            <Button size='sm' type='icon' variant='ghost' full={false}>
              <AiOutlineMore color={theme.colors.neutral[500]} size={18} />
            </Button>
          </Tooltip>
        </Row>
      </S.ListItem>
      <S.ListItem>
        <Tooltip message='Money' position='left'>
          <S.TransactionIcon>
            <FiDollarSign size={20} />
          </S.TransactionIcon>
        </Tooltip>
        <S.TransactionInfo type='credit'>
          <strong>Salary</strong>
          <small>+R$ 10,000.00</small>
        </S.TransactionInfo>
        <Row marginLeft='auto' columnGap='0.4rem'>
          <Tooltip message='Edit transaction' position='left'>
            <Button size='sm' type='icon' variant='ghost' full={false}>
              <AiOutlineEdit color={theme.colors.neutral[500]} size={18} />
            </Button>
          </Tooltip>
          <Tooltip message='Show more' position='right'>
            <Button size='sm' type='icon' variant='ghost' full={false}>
              <AiOutlineMore color={theme.colors.neutral[500]} size={18} />
            </Button>
          </Tooltip>
        </Row>
      </S.ListItem>
    </ul>
  )
}
