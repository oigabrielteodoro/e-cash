import React, {
  useState,
  InputHTMLAttributes,
  ComponentType,
  forwardRef,
  ForwardRefRenderFunction,
  FocusEvent,
} from 'react'
import { AiOutlineExclamationCircle } from 'react-icons/ai'
import type { IconBaseProps } from 'react-icons'

import * as S from './Input.styled'

type Props = {
  label: string
  error?: string
  icon: ComponentType<IconBaseProps>
} & InputHTMLAttributes<HTMLInputElement>

const ForwardInput: ForwardRefRenderFunction<HTMLInputElement, Props> = (
  { name, label, error, icon: Icon, onBlur, ...rest }: Props,
  ref,
) => {
  const [isFocused, setIsFocused] = useState(false)

  function handleOnBlur(event: FocusEvent<HTMLInputElement>) {
    event.preventDefault()

    setIsFocused(false)

    onBlur && onBlur(event)
  }

  function handleOnFocus() {
    setIsFocused(true)
  }

  return (
    <S.Wrapper>
      <label htmlFor={name}>{label}</label>
      <S.Container isFocused={isFocused}>
        <input
          id={name}
          ref={ref}
          onBlur={handleOnBlur}
          onFocus={handleOnFocus}
          {...rest}
        />
        {Icon && <Icon size={22} />}
      </S.Container>
      {error && (
        <S.ErrorContainer>
          <AiOutlineExclamationCircle size={18} />
          <span>{error}</span>
        </S.ErrorContainer>
      )}
    </S.Wrapper>
  )
}

export const Input = forwardRef(ForwardInput)
