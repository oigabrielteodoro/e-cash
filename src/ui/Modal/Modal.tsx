import React, { ReactNode } from 'react'
import ReactDOM from 'react-dom'
import { FiX } from 'react-icons/fi'
import { AnimatePresence } from 'framer-motion'

import { CloseWhenKeyUpEscape, Button, Row } from 'ui'

import * as S from './Modal.styled'

type Props = {
  title: string
  isOpen: boolean
  children: ReactNode
  header?: ReactNode
  onClose: () => void
}

export function Modal({
  title,
  header,
  children,
  isOpen = false,
  onClose,
}: Props) {
  return ReactDOM.createPortal(
    <CloseWhenKeyUpEscape onClose={onClose}>
      <AnimatePresence>
        {isOpen && (
          <S.Container onClick={onClose}>
            <S.Dialog
              role='dialog'
              onClick={(event) => event.stopPropagation()}
            >
              <S.Header>
                <S.Title>{title}</S.Title>
                <Row marginLeft='auto' alignItems='center' columnGap='0.8rem'>
                  {header}

                  <Button
                    type='icon'
                    variant='ghost'
                    aria-label='close button'
                    onClick={onClose}
                  >
                    <FiX size={20} />
                  </Button>
                </Row>
              </S.Header>
              <S.Content>{children}</S.Content>
            </S.Dialog>
          </S.Container>
        )}
      </AnimatePresence>
    </CloseWhenKeyUpEscape>,
    document.body,
  )
}
