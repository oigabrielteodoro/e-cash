import React from 'react'
import { AiOutlineBank } from 'react-icons/ai'

import truncate from 'lodash/truncate'

import { Row, Col, Tooltip, Space } from 'ui'
import {
  accountNumberWithDigitMask,
  decimalFromInt,
  toMask,
  useIsOpen,
} from 'lib'

import * as S from './AccountCard.styled'

export type AccountCardProps = {
  name: string
  flag?: string
  bankName: string
  disabled?: boolean
  agencyNumber: string
  accountNumber: string
  balance: string
}

export function AccountCard({
  name,
  flag,
  bankName,
  disabled,
  agencyNumber,
  accountNumber,
  balance,
}: AccountCardProps) {
  const isOpen = useIsOpen()

  const {
    balanceFormatted,
    accountNumberFormatted,
    bankNameWithEllipsis,
    nameWithEllipsis,
  } = getAccountToRender({
    isOpen,
    name,
    balance,
    bankName,
    accountNumber,
  })

  return (
    <S.Container disabled={disabled}>
      <Row>
        <Col span={24}>
          <Row>
            <S.AccountFlagBox>
              <Tooltip
                alwaysOnTop
                message={
                  disabled
                    ? 'This account is not include sum on dashboard'
                    : name
                }
                position='top'
              >
                {flag ? (
                  <S.AccountFlagImg src={flag} alt={bankName} />
                ) : (
                  <S.AccountFlagImg as='div'>
                    <AiOutlineBank size={28} />
                  </S.AccountFlagImg>
                )}
              </Tooltip>
              <Row justifyContent='space-between' width='100%'>
                <S.AccountInfoBox>
                  <Tooltip
                    disabled={name.length <= nameWithEllipsis.length}
                    message={name}
                    position='top'
                  >
                    <strong>{nameWithEllipsis}</strong>
                  </Tooltip>
                  <Space marginTop='-0.4rem'>
                    <Tooltip
                      disabled={bankName.length <= bankNameWithEllipsis.length}
                      message={bankName}
                      position='bottom'
                    >
                      <small>{bankNameWithEllipsis}</small>
                    </Tooltip>
                  </Space>
                </S.AccountInfoBox>
                <S.Separator />
                <S.AccountInfo>
                  <span>
                    Ag. <strong>{agencyNumber}</strong>
                  </span>
                  <span>
                    Conta. <strong>{accountNumberFormatted}</strong>
                  </span>
                </S.AccountInfo>
              </Row>
            </S.AccountFlagBox>

            <S.AccountBalanceBox>
              <S.AccountBalance>{balanceFormatted}</S.AccountBalance>
              <span>+30% since last month</span>
            </S.AccountBalanceBox>
          </Row>
        </Col>
      </Row>
    </S.Container>
  )
}

function getAccountToRender({
  isOpen,
  name,
  bankName,
  balance,
  accountNumber,
}: { isOpen: boolean } & Pick<
  AccountCardProps,
  'balance' | 'name' | 'bankName' | 'accountNumber'
>) {
  const balanceFormatted = decimalFromInt(balance)
  const accountNumberFormatted = toMask(accountNumber, [
    accountNumberWithDigitMask,
  ])

  const nameWithEllipsis = truncate(name, {
    length: isOpen ? 13 : 16,
  })

  const bankNameWithEllipsis = truncate(bankName, {
    length: isOpen ? 16 : 20,
  })

  return {
    balanceFormatted,
    nameWithEllipsis,
    bankNameWithEllipsis,
    accountNumberFormatted,
  }
}
