import React, { ReactNode } from 'react'
import ReactDOM from 'react-dom'
import { FiX } from 'react-icons/fi'
import { AnimatePresence } from 'framer-motion'

import { CloseWhenKeyUpEscape } from 'ui'

import * as S from './Modal.styled'

type Props = {
  isOpen: boolean
  children: ReactNode
  onClose: () => void
}

export function Modal({ children, isOpen = false, onClose }: Props) {
  return ReactDOM.createPortal(
    <CloseWhenKeyUpEscape onClose={onClose}>
      <AnimatePresence>
        {isOpen && (
          <S.Container onClick={onClose}>
            <S.Dialog onClick={(event) => event.stopPropagation()}>
              <S.CloseButton aria-label='close button' onClick={onClose}>
                <FiX size={24} />
              </S.CloseButton>
              {children}
            </S.Dialog>
          </S.Container>
        )}
      </AnimatePresence>
    </CloseWhenKeyUpEscape>,
    document.body,
  )
}
