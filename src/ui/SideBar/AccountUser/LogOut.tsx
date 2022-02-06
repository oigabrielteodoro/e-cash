import React from 'react'
import { FiX } from 'react-icons/fi'
import { AiOutlineLogout } from 'react-icons/ai'

import { Row, Col, Modal, LoadIcon } from 'ui'
import { useLogOut } from 'client'

import * as S from './LogOut.styled'

type Props = {
  isOpen: boolean
  onClose: () => void
}

export function LogOut({ isOpen, onClose }: Props) {
  const { logOut, isLoading } = useLogOut()

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <S.Container>
        <h1>Are you sure you want to log out? 😢</h1>
        <p>When you exit the application, the data is still saved</p>

        <Row height='12.15rem' gutter={[16, 0]} marginTop='2rem'>
          <Col span={12}>
            <button className='cancel' onClick={onClose}>
              <FiX size={24} />
              Cancel
            </button>
          </Col>
          <Col span={12}>
            <button
              className='confirm'
              disabled={isLoading}
              onClick={() => logOut()}
            >
              {isLoading ? (
                <LoadIcon size={24} />
              ) : (
                <AiOutlineLogout size={24} />
              )}
              Log out
            </button>
          </Col>
        </Row>
      </S.Container>
    </Modal>
  )
}
