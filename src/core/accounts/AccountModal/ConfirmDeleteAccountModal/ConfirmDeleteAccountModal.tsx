import { useDeleteAccount } from 'client'
import React from 'react'

import { Modal, Row, Button, Flex, notification } from 'ui'

import * as S from './ConfirmDeleteAccountModal.styled'

type Props = {
  isOpen: boolean
  accountId: string
  onClose: () => void
}

export function ConfirmDeleteAccountModal({
  isOpen,
  accountId,
  onClose,
}: Props) {
  const { isLoading, deleteAccount } = useDeleteAccount({
    onSuccess: () => {
      notification.success('Your account has been deleted!')

      onClose()
    },
    onError: () => {
      notification.error(
        'Hmm... There was an error trying to delete your account!',
      )
    },
  })

  function handleOnConfirm() {
    deleteAccount(accountId)
  }

  return (
    <Modal title='Delete your account?' isOpen={isOpen} onClose={onClose}>
      <Flex flexDirection='column'>
        <S.Title>
          Are you sure you want
          <br /> to delete your account?
        </S.Title>
        <S.Description>
          When deleting the account all transactions
          <br /> linked to it will be lost.
        </S.Description>
        <Row alignItems='center' alignSelf='center' columnGap='2.4rem'>
          <Button full={false} size='lg' variant='outline' onClick={onClose}>
            No, please
          </Button>
          <Button
            full={false}
            size='lg'
            variant='danger'
            loading={isLoading}
            onClick={handleOnConfirm}
          >
            Yes, delete!
          </Button>
        </Row>
      </Flex>
    </Modal>
  )
}
