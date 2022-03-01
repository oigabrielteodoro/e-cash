import React from 'react'

import truncate from 'lodash/truncate'

import { Row, Col, Tooltip } from 'ui'
import { useIsOpen } from 'lib'

import * as S from './BankAccount.styled'

type Props = {
  name: string
  flag: string
  bankName: string
}

export function BankAccount({ name, flag, bankName }: Props) {
  const isOpen = useIsOpen()

  const MAX_LENGTH = isOpen ? 15 : 22

  const nameWithEllipsis = truncate('Conta Nubank', {
    length: MAX_LENGTH,
  })

  const bankNameWithEllipsis = truncate('NU PAGAMENTOS S.A', {
    length: MAX_LENGTH,
  })

  return (
    <S.AccountBankCard>
      <Row>
        <Col span={24}>
          <Row>
            <S.AccountBankFlagBox>
              <S.AccountBankFlagImg src={flag} alt='Nubank' />
              <Row justifyContent='space-between' width='100%'>
                <S.AccountBankInfoBox>
                  <Tooltip
                    disabled={name.length <= MAX_LENGTH}
                    message={name}
                    position='top'
                  >
                    <h3>{nameWithEllipsis}</h3>
                  </Tooltip>
                  <Tooltip
                    disabled={name.length <= MAX_LENGTH}
                    message={bankName}
                    position='bottom'
                  >
                    <small>{bankNameWithEllipsis}</small>
                  </Tooltip>
                </S.AccountBankInfoBox>
                <S.Separator />
                <S.AccountBankInfo>
                  <span>
                    Ag. <strong>0001</strong>
                  </span>
                  <span>
                    Conta. <strong>17089-1</strong>
                  </span>
                </S.AccountBankInfo>
              </Row>
            </S.AccountBankFlagBox>

            <S.AccountBankBalanceBox>
              <S.AccountBankBalance>R$ 10,000.00</S.AccountBankBalance>
              <span>+30% since last month</span>
            </S.AccountBankBalanceBox>
          </Row>
        </Col>
      </Row>
    </S.AccountBankCard>
  )
}
