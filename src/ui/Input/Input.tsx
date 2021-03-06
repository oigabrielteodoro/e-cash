import React, {
  forwardRef,
  InputHTMLAttributes,
  ComponentType,
  ForwardRefRenderFunction,
  ForwardRefExoticComponent,
  ForwardedRef,
} from 'react'
import { AiOutlineExclamationCircle } from 'react-icons/ai'
import type { IconBaseProps } from 'react-icons'

import { useInput } from 'lib'

import { AmountInput } from './AmountInput'
import { MaskedInput } from './MaskedInput'
import { PasswordInput } from './PasswordInput'
import { TextAreaInput } from './TextAreaInput'

import * as S from './Input.styled'

export type InputProps = {
  ref?: ForwardedRef<HTMLInputElement>
  label: string
  error?: string
  variant?: 'primary' | 'secondary'
  icon: ComponentType<IconBaseProps>
} & InputHTMLAttributes<HTMLInputElement>

type InputCompoundComponet = {
  Amount: typeof AmountInput
  Password: typeof PasswordInput
  TextArea: typeof TextAreaInput
  Masked: typeof MaskedInput
} & ForwardRefExoticComponent<InputProps>

const ForwardInput: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  {
    defaultValue,
    label,
    error,
    variant = 'primary',
    icon: Icon,
    name,
    id = name,
    disabled = false,
    required = false,
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
    <S.Wrapper isRequired={required}>
      <label htmlFor={id}>{label}</label>
      <S.Container
        variant={variant}
        isFilled={isFilled}
        isFocused={isFocused}
        isErrored={isErrored}
        isDisabled={disabled}
      >
        <input
          id={id}
          ref={ref}
          name={name}
          aria-label={name}
          defaultValue={defaultValue}
          disabled={disabled}
          required={required}
          onBlur={handleOnBlur}
          onFocus={handleOnFocus}
          role='textbox'
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
Input.Password = PasswordInput
Input.TextArea = TextAreaInput
Input.Masked = MaskedInput

export { PasswordStrength } from './PasswordInput'
