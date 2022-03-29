import React, { ChangeEvent, useRef } from 'react'

import { toDecimal } from 'lib'
import { Button, Grid, Modal, notification } from 'ui'
import { inputNumberParser } from 'ui/Input/AmountInput'

import type { Account } from 'client'

import * as S from './EditBalanceAccountModal.styled'

type Props = {
  isOpen: boolean
  account: Account
  onClose: () => void
}

export function EditBalanceAccountModal({ isOpen, account, onClose }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)

  const defaultValue = toDecimal(account.balance)

  function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault()

    if (inputRef.current) {
      inputRef.current.value = toDecimal(
        inputNumberParser(event.currentTarget.value),
      )
    }
  }

  function handleOnSubmit() {
    notification.success('Yeah! Your balance is been changed.')
    onClose()
  }

  return (
    <Modal title='Edit balance account' isOpen={isOpen} onClose={onClose}>
      <S.Container>
        <S.GhostInput
          autoFocus
          ref={inputRef}
          defaultValue={defaultValue}
          onChange={handleOnChange}
        />
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
        <Button.IconBadge onClick={handleOnSubmit}>Confirm</Button.IconBadge>
      </Grid>
    </Modal>
  )
}
