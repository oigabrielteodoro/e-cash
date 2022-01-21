import React, {
  ButtonHTMLAttributes,
  ForwardRefRenderFunction,
  forwardRef,
} from 'react'

import { AiOutlineSync } from 'react-icons/ai'

import * as S from './Button.styled'

type Props = {
  children: string
  loading?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

const ForwardButton: ForwardRefRenderFunction<HTMLButtonElement, Props> = (
  { children, loading = false, disabled = false, ...rest },
  ref,
) => {
  return (
    <S.Container ref={ref} disabled={loading || disabled} {...rest}>
      {loading ? <AiOutlineSync size={18} /> : children}
    </S.Container>
  )
}

export const Button = forwardRef(ForwardButton)
