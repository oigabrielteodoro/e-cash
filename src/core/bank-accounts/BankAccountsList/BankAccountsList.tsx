import React from 'react'

import truncate from 'lodash/truncate'

import { NUBANK } from 'assets'
import { Col, Row, Tooltip } from 'ui'
import { useIsOpen } from 'core/layout'

import * as S from './BankAccountsList.styled'

export function BankAccountsList() {
  const isOpen = useIsOpen()

  const MAX_LENGTH = isOpen ? 15 : 22

  const accountName = truncate('Conta Nubank', {
    length: MAX_LENGTH,
  })

  return (
    <Row as='ul' gutter={[32, 32]}>
      {[1, 2, 3, 4].map((account) => (
        <Col as='li' key={account} md={24} lg={12} xlg={8}>
          <S.AccountBankCard>
            <Row>
              <Col span={24}>
                <Row>
                  <S.AccountBankFlagBox>
                    <S.AccountBankFlagImg src={NUBANK} alt='Nubank' />
                    <Row justifyContent='space-between' width='100%'>
                      <S.AccountBankInfoBox>
                        <Tooltip
                          message='Conta Principal de Teste'
                          position='top'
                        >
                          <h3>{accountName}</h3>
                        </Tooltip>
                        <small>NU PAGAMENTOS S.A</small>
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
        </Col>
      ))}
    </Row>
  )
}
