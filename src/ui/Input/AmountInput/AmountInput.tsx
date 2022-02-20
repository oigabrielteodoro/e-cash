import React, {
  useEffect,
  InputHTMLAttributes,
  KeyboardEvent,
  ChangeEvent,
} from 'react'
import { FiDollarSign } from 'react-icons/fi'
import { AiOutlineExclamationCircle } from 'react-icons/ai'
import { useFormContext } from 'react-hook-form'

import { useInput } from 'hooks'
import { toDecimal } from 'lib'

import * as InputStyled from '../Input.styled'

export type AmountInputProps = {
  name: string
  label: string
  error?: string
  variant?: 'primary' | 'secondary'
  defaultValue?: string
} & InputHTMLAttributes<HTMLInputElement>

function inputNumberParser(value?: string): string {
  return value ? value.replace(/\W/g, '') : ''
}

export function AmountInput({
  id,
  name,
  variant = 'primary',
  label,
  error,
  onFocus,
  onBlur,
  ...rest
}: AmountInputProps) {
  const { register, watch, setValue } = useFormContext()

  const value = watch(name)

  const {
    isFocused,
    isFilled,
    isErrored,
    errorMessage,
    handleOnBlur,
    handleOnFocus,
  } = useInput({
    defaultValue: value,
    error,
    onBlur,
    onFocus,
  })

  useEffect(() => {
    register(name)
  }, [name, register])

  const formattedValue = value ? toDecimal(inputNumberParser(value)) : ''

  function handleOnKeyPress(event: KeyboardEvent<HTMLInputElement>) {
    if (!/[0-9]/.test(event.key)) event.preventDefault()
  }

  function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.currentTarget.value
    const amount = inputNumberParser(value)

    setValue(name, amount)
  }

  return (
    <InputStyled.Wrapper>
      <label htmlFor={id}>{label}</label>
      <InputStyled.Container
        variant={variant}
        isFilled={isFilled}
        isFocused={isFocused}
        isErrored={isErrored}
      >
        <input
          id={id}
          name={name}
          aria-label={name}
          value={formattedValue}
          onBlur={handleOnBlur}
          onFocus={handleOnFocus}
          onKeyPress={handleOnKeyPress}
          {...rest}
          onChange={handleOnChange}
        />
        <FiDollarSign size={22} />
      </InputStyled.Container>
      {error && (
        <InputStyled.ErrorContainer>
          <AiOutlineExclamationCircle size={18} />
          <span>{errorMessage}</span>
        </InputStyled.ErrorContainer>
      )}
    </InputStyled.Wrapper>
  )
}
