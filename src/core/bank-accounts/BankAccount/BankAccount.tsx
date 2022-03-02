import React from 'react'

import truncate from 'lodash/truncate'

import { Row, Col, Tooltip } from 'ui'
import { useIsOpen } from 'lib'

import * as S from './BankAccount.styled'

export type BankAccountProps = {
  name: string
  flag: string
  bankName: string
  disabled?: boolean
}

export function BankAccount({
  name,
  flag,
  bankName,
  disabled,
}: BankAccountProps) {
  const isOpen = useIsOpen()

  const MAX_LENGTH = isOpen ? 15 : 18

  const nameWithEllipsis = truncate(name, {
    length: MAX_LENGTH,
  })

  const bankNameWithEllipsis = truncate(bankName, {
    length: MAX_LENGTH,
  })

  return (
    <S.Container disabled={disabled}>
      <Row>
        <Col span={24}>
          <Row>
            <S.BankAccountFlagBox>
              <Tooltip
                disabled={!disabled}
                message='This bank account is disabled'
                position='top'
              >
                <S.BankAccountFlagImg src={flag} alt='Nubank' />
              </Tooltip>
              <Row justifyContent='space-between' width='100%'>
                <S.BankAccountInfoBox>
                  <Tooltip
                    disabled={name.length <= MAX_LENGTH}
                    message={name}
                    position='top'
                  >
                    <h3>{nameWithEllipsis}</h3>
                  </Tooltip>
                  <Tooltip
                    disabled={bankName.length <= MAX_LENGTH}
                    message={bankName}
                    position='bottom'
                  >
                    <small>{bankNameWithEllipsis}</small>
                  </Tooltip>
                </S.BankAccountInfoBox>
                <S.Separator />
                <S.BankAccountInfo>
                  <span>
                    Ag. <strong>0001</strong>
                  </span>
                  <span>
                    Conta. <strong>17089-1</strong>
                  </span>
                </S.BankAccountInfo>
              </Row>
            </S.BankAccountFlagBox>

            <S.BankAccountBalanceBox>
              <S.BankAccountBalance>R$ 10,000.00</S.BankAccountBalance>
              <span>+30% since last month</span>
            </S.BankAccountBalanceBox>
          </Row>
        </Col>
      </Row>
    </S.Container>
  )
}
