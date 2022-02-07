import React, { ReactNode, CSSProperties, useState } from 'react'
import { AnimatePresence } from 'framer-motion'

import * as S from './Popover.styled'

export type PopoverProps = {
  name?: string
  innerContent: ReactNode
  children: ReactNode
  position?: 'left' | 'right' | 'top' | 'bottom'
  customWidth?: string
  wrapperStyle?: CSSProperties
}

export function Popover({
  name,
  children,
  innerContent,
  position = 'top',
  customWidth = '100%',
  wrapperStyle,
}: PopoverProps) {
  const [isOpen, setIsOpen] = useState(false)

  function handleOnClick() {
    setIsOpen((prevState) => !prevState)
  }

  return (
    <S.Wrapper style={wrapperStyle}>
      <S.Container aria-label={name} onClick={handleOnClick}>
        {children}
      </S.Container>
      <AnimatePresence>
        {isOpen && (
          <>
            <S.Popover
              aria-label='popover'
              customWidth={customWidth}
              position={position}
            >
              {innerContent}
            </S.Popover>
            <S.Indicator position={position} />
          </>
        )}
      </AnimatePresence>
    </S.Wrapper>
  )
}
