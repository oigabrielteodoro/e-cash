import React from 'react'

import { decimalFromInt } from 'lib'
import { Button, Grid, Modal } from 'ui'

import type { Account } from 'client'

import * as S from './EditBalanceAccountModal.styled'

type Props = {
  isOpen: boolean
  account: Account
  onClose: () => void
}

export function EditBalanceAccountModal({ isOpen, account, onClose }: Props) {
  const balanceFormatted = decimalFromInt(account.balance)

  return (
    <Modal title='Edit balance account' isOpen={isOpen} onClose={onClose}>
      <S.Container>
        <h1>{balanceFormatted}</h1>
        <p>
          When changing balance from account,
          <br /> will be created a new transaction to register
          <br /> this change
        </p>
      </S.Container>
      <Grid columns={2} gap='2.4rem' marginTop='2.4rem'>
        <Button.IconBadge variant='danger' onClick={onClose}>
          Cancel
        </Button.IconBadge>
        <Button.IconBadge onClick={onClose}>Confirm</Button.IconBadge>
      </Grid>
    </Modal>
  )
}
