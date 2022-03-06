import React, { ReactNode } from 'react'
import ReactDOM from 'react-dom'
import { FiX } from 'react-icons/fi'
import { AnimatePresence } from 'framer-motion'

import { CloseWhenKeyUpEscape } from 'ui'

import * as S from './Drawer.styled'

type DrawerProps = {
  isOpen: boolean
  children: ReactNode
  header?: ReactNode
  footer?: ReactNode
  width?: number
  onClose: () => void
}

export function Drawer({
  isOpen,
  children,
  header,
  footer,
  width,
  onClose,
}: DrawerProps) {
  return ReactDOM.createPortal(
    <CloseWhenKeyUpEscape onClose={onClose}>
      <AnimatePresence>
        {isOpen && (
          <S.Container onClick={onClose}>
            <S.Dialog
              onClick={(event) => event.stopPropagation()}
              style={{ width }}
            >
              <S.Header>
                {header}
                <S.CloseButton aria-label='close button' onClick={onClose}>
                  <FiX size={24} />
                </S.CloseButton>
              </S.Header>
              <S.Body>{children}</S.Body>
              {footer && <S.Footer>{footer}</S.Footer>}
            </S.Dialog>
          </S.Container>
        )}
      </AnimatePresence>
    </CloseWhenKeyUpEscape>,
    document.body,
  )
}
