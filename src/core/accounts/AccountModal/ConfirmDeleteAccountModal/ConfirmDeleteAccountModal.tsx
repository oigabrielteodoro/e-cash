import React from 'react'

import { Modal, Row, Button, Flex } from 'ui'

import * as S from './ConfirmDeleteAccountModal.styled'

type Props = {
  isOpen: boolean
  onClose: () => void
}

export function ConfirmDeleteAccountModal({ isOpen, onClose }: Props) {
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
          <Button full={false} size='lg' variant='danger'>
            Yes, delete!
          </Button>
        </Row>
      </Flex>
    </Modal>
  )
}
