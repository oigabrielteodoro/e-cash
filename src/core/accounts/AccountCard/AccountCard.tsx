import React, { useState } from 'react'

import truncate from 'lodash/truncate'

import { Row, Col, Tooltip, Space, ShimmerEffect } from 'ui'
import {
  accountNumberWithDigitMask,
  decimalFromInt,
  toMask,
  useIsOpen,
} from 'lib'

import type { Account } from 'client'

import { BankingInstitutionFlag } from 'core/bankingInstitutions'
import { AccountModal } from '../AccountModal'

import * as S from './AccountCard.styled'

export type AccountCardProps = {
  account: Account
}

type GetAccountToRenderParams = {
  isOpen?: boolean
  institutionName: string
} & Pick<Account, 'balance' | 'name' | 'accountNumber'>

export function AccountCard({ account }: AccountCardProps) {
  const isSideBarOpen = useIsOpen()
  const [isOpen, setIsOpen] = useState(false)

  const isDisabled = !account.includeSumOnDashboard
  const institutionName = account.bankingInstitution?.institutionName ?? '--'

  const flagTooltipMessage = isDisabled
    ? 'This account is not include sum on dashboard'
    : account.name

  const {
    balanceFormatted,
    accountNumberFormatted,
    institutionNameWithEllipsis,
    nameWithEllipsis,
  } = getAccountToRender({
    institutionName,
    isOpen: isSideBarOpen,
    name: account.name,
    balance: account.balance,
    accountNumber: account.accountNumber,
  })

  return (
    <>
      <S.Container disabled={isDisabled} onClick={() => setIsOpen(true)}>
        <Row>
          <Col span={24}>
            <Row>
              <S.AccountFlagBox>
                <Tooltip
                  alwaysOnTop
                  message={flagTooltipMessage}
                  position={isDisabled ? 'right' : 'top'}
                >
                  <BankingInstitutionFlag
                    disabled={isDisabled}
                    institutionName={institutionName}
                    imageUrl={account.bankingInstitution?.imageUrl}
                  />
                </Tooltip>
                <Row justifyContent='space-between' width='100%'>
                  <S.AccountInfoBox>
                    <Tooltip
                      disabled={account.name.length <= nameWithEllipsis.length}
                      message={account.name}
                      position='top'
                    >
                      <strong>{nameWithEllipsis}</strong>
                    </Tooltip>
                    <Space marginTop='-0.4rem'>
                      <Tooltip
                        disabled={
                          institutionName.length! <=
                          institutionNameWithEllipsis.length
                        }
                        message={institutionName}
                        position='bottom'
                      >
                        <small>{institutionNameWithEllipsis}</small>
                      </Tooltip>
                    </Space>
                  </S.AccountInfoBox>
                  <S.Separator />
                  <S.AccountInfo>
                    <span>
                      Ag. <strong>{account.agencyNumber}</strong>
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

      <AccountModal
        isOpen={isOpen}
        account={account}
        onClose={() => setIsOpen(false)}
      />
    </>
  )
}

AccountCard.Skeleton = function Skeleton() {
  return (
    <S.Container>
      <Row>
        <Col span={24}>
          <Row>
            <S.AccountFlagBox>
              <ShimmerEffect
                isLoading
                variant='image'
                style={{
                  borderRadius: '0.5rem',
                  height: '4.2rem',
                  minWidth: '4.2rem',
                }}
              />
              <Row justifyContent='space-between' width='100%'>
                <S.AccountInfoBox>
                  <ShimmerEffect isLoading style={{ width: '20rem' }} />
                  <ShimmerEffect isLoading style={{ width: '10rem' }} />
                </S.AccountInfoBox>
                <Row flexDirection='column'>
                  <ShimmerEffect isLoading style={{ width: '10rem' }} />
                  <ShimmerEffect isLoading style={{ width: '10rem' }} />
                </Row>
              </Row>
            </S.AccountFlagBox>

            <S.AccountBalanceBox>
              <ShimmerEffect size='sm' isLoading />
              <Space margin='0'>
                <ShimmerEffect isLoading />
              </Space>
            </S.AccountBalanceBox>
          </Row>
        </Col>
      </Row>
    </S.Container>
  )
}

function getAccountToRender({
  isOpen = false,
  name,
  institutionName,
  balance,
  accountNumber,
}: GetAccountToRenderParams) {
  const balanceFormatted = decimalFromInt(balance)
  const accountNumberFormatted = toMask(accountNumber, [
    accountNumberWithDigitMask,
  ])

  const nameWithEllipsis = truncate(name, {
    length: isOpen ? 13 : 16,
  })

  const institutionNameWithEllipsis = truncate(institutionName, {
    length: isOpen ? 14 : 18,
  })

  return {
    balanceFormatted,
    nameWithEllipsis,
    institutionNameWithEllipsis,
    accountNumberFormatted,
  }
}
