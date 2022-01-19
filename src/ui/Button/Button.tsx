import React, {
  ButtonHTMLAttributes,
  ForwardRefRenderFunction,
  forwardRef,
} from 'react'

import * as S from './Button.styled'

type Props = {
  children: string
} & ButtonHTMLAttributes<HTMLButtonElement>

const ForwardButton: ForwardRefRenderFunction<HTMLButtonElement, Props> = (
  { children, ...rest },
  ref,
) => {
  return (
    <S.Container ref={ref} {...rest}>
      {children}
    </S.Container>
  )
}

export const Button = forwardRef(ForwardButton)
