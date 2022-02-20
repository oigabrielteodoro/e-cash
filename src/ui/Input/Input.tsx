import React, {
  forwardRef,
  InputHTMLAttributes,
  ComponentType,
  ForwardRefRenderFunction,
  ForwardRefExoticComponent,
} from 'react'
import { AiOutlineExclamationCircle } from 'react-icons/ai'
import type { IconBaseProps } from 'react-icons'

import { useInput } from 'hooks'
import { AmountInput } from './Amount'

import * as S from './Input.styled'

export type InputProps = {
  label: string
  error?: string
  variant?: 'primary' | 'secondary'
  icon: ComponentType<IconBaseProps>
} & InputHTMLAttributes<HTMLInputElement>

type InputCompoundComponet = {
  Amount: typeof AmountInput
} & ForwardRefExoticComponent<InputProps>

const ForwardInput: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  {
    id,
    defaultValue,
    label,
    error,
    variant = 'primary',
    icon: Icon,
    name,
    onBlur,
    onFocus,
    ...rest
  },
  ref,
) => {
  const {
    isFilled,
    isFocused,
    isErrored,
    errorMessage,
    handleOnBlur,
    handleOnFocus,
  } = useInput({
    defaultValue,
    error,
    onBlur,
    onFocus,
  })

  return (
    <S.Wrapper>
      <label htmlFor={id}>{label}</label>
      <S.Container
        variant={variant}
        isFilled={isFilled}
        isFocused={isFocused}
        isErrored={isErrored}
      >
        <input
          id={id}
          ref={ref}
          name={name}
          aria-label={name}
          defaultValue={defaultValue}
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

export const Input = forwardRef(ForwardInput) as InputCompoundComponet

Input.Amount = AmountInput
