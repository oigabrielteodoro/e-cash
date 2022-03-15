import React, { useState } from 'react'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'

import { Modal, Row, Tooltip, Button, InfoBox, Space } from 'ui'

import { BankingInstitutionFlag } from 'core/bankingInstitutions'
import { LastTransactionsList } from 'core/accounts/LastTransactionsList'

import type { Account } from 'client'

import { accountNumberWithDigitMask, decimalFromInt, toMask } from 'lib'

import { EditAccountDrawer } from '../EditAccountDrawer'
import * as S from './AccountModal.styled'
import { ConfirmDeleteAccountModal } from './ConfirmDeleteAccountModal'

type Props = {
  account: Account
  isOpen: boolean
  onClose: () => void
}

export function AccountModal({ isOpen, account, onClose }: Props) {
  const [isConfirmDeleteAccountModal, setIsConfirmDeleteAccountModal] =
    useState(false)
  const [isEditAccountDrawerVisible, setIsEditAccountDrawerVisible] =
    useState(false)

  const institutionName = account.bankingInstitution?.institutionName ?? '--'

  const balanceFormatted = decimalFromInt(account.balance)
  const accountNumberFormatted = toMask(account.accountNumber, [
    accountNumberWithDigitMask,
  ])

  return (
    <>
      <EditAccountDrawer
        account={account}
        isOpen={isEditAccountDrawerVisible}
        onClose={() => setIsEditAccountDrawerVisible(false)}
      />

      <ConfirmDeleteAccountModal
        isOpen={isConfirmDeleteAccountModal}
        onClose={() => setIsConfirmDeleteAccountModal(false)}
      />

      <Modal
        title='Account details'
        header={
          <>
            <Tooltip position='top' message='Edit account'>
              <Button
                type='icon'
                variant='ghost'
                onClick={() => setIsEditAccountDrawerVisible(true)}
              >
                <AiOutlineEdit size={20} />
              </Button>
            </Tooltip>
            <Tooltip position='top' message='Delete account'>
              <Button
                type='icon'
                variant='ghost'
                onClick={() => setIsConfirmDeleteAccountModal(true)}
              >
                <AiOutlineDelete size={20} />
              </Button>
            </Tooltip>
          </>
        }
        isOpen={isOpen}
        onClose={onClose}
      >
        <S.AccountBalanceBox>
          <S.AccountBalanceAmountBox>
            <span>Current balance</span>
            <strong>{balanceFormatted}</strong>
          </S.AccountBalanceAmountBox>
          <Tooltip position='left' message='Adjust balance'>
            <Button type='icon'>
              <AiOutlineEdit size={20} />
            </Button>
          </Tooltip>
        </S.AccountBalanceBox>
        <Row alignItems='center'>
          <Row alignItems='flex-start'>
            <BankingInstitutionFlag
              imageUrl={account.bankingInstitution?.imageUrl}
              institutionName={institutionName}
              width='6.2rem'
              height='6.2rem'
            />

            <S.AccountInfoBox>
              <strong>{account.name}</strong>
              <span>{institutionName}</span>
            </S.AccountInfoBox>
          </Row>

          <S.AccountInfoSeparator />

          <S.AccountInfo>
            <span>
              Ag. <strong>{account.agencyNumber}</strong>
            </span>
            <span>
              Conta. <strong>{accountNumberFormatted}</strong>
            </span>
          </S.AccountInfo>
        </Row>

        <S.HorizontalSeparator />

        <LastTransactionsList />

        {!account.includeSumOnDashboard && (
          <Space marginTop='4.2rem'>
            <InfoBox message="This account doesn't is included in sum on dashboard!" />
          </Space>
        )}
      </Modal>
    </>
  )
}
