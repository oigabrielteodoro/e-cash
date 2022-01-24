import React, {
  useState,
  InputHTMLAttributes,
  ComponentType,
  forwardRef,
  ForwardRefRenderFunction,
  FocusEvent,
} from 'react'
import { AiOutlineExclamationCircle } from 'react-icons/ai'

import capitalize from 'lodash/capitalize'

import type { IconBaseProps } from 'react-icons'

import * as S from './Input.styled'

type Props = {
  label: string
  error?: string
  icon: ComponentType<IconBaseProps>
} & InputHTMLAttributes<HTMLInputElement>

const ForwardInput: ForwardRefRenderFunction<HTMLInputElement, Props> = (
  {
    id,
    defaultValue,
    label,
    error,
    icon: Icon,
    name,
    onBlur,
    onFocus,
    ...rest
  },
  ref,
) => {
  const [isFilled, setIsFilled] = useState(!!defaultValue)
  const [isFocused, setIsFocused] = useState(false)

  const isErrored = !!error

  const errorMessage = error ? capitalize(error) : ''

  function handleOnBlur(event: FocusEvent<HTMLInputElement>) {
    event.preventDefault()

    setIsFocused(false)
    setIsFilled(!!event.target.value)

    onBlur && onBlur(event)
  }

  function handleOnFocus(event: FocusEvent<HTMLInputElement>) {
    setIsFocused(true)
    setIsFilled(!!event.target.value)

    onFocus && onFocus(event)
  }

  return (
    <S.Wrapper>
      <label htmlFor={id}>{label}</label>
      <S.Container
        isFilled={isFilled}
        isFocused={isFocused}
        isErrored={isErrored}
      >
        <input
          id={id}
          ref={ref}
          name={name}
          aria-label={name}
          onBlur={handleOnBlur}
          onFocus={handleOnFocus}
          {...rest}
        />
        {Icon && <Icon size={22} />}
      </S.Container>
      {error && (
        <S.ErrorContainer>
          <AiOutlineExclamationCircle size={18} />
          <span>{errorMessage}</span>
        </S.ErrorContainer>
      )}
    </S.Wrapper>
  )
}

export const Input = forwardRef(ForwardInput)
