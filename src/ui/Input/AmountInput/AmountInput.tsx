import React, {
  useEffect,
  InputHTMLAttributes,
  KeyboardEvent,
  ChangeEvent,
} from 'react'
import { FiDollarSign } from 'react-icons/fi'
import { AiOutlineExclamationCircle } from 'react-icons/ai'
import { useFormContext } from 'react-hook-form'

import { isOnlyNumbers, toDecimal, useInput } from 'lib'

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
  name,
  id = name,
  variant = 'primary',
  label,
  error,
  disabled = false,
  required = false,
  onFocus,
  onBlur,
  onChange,
  ...rest
}: AmountInputProps) {
  const { register, watch, trigger, setValue } = useFormContext()

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
    if (!isOnlyNumbers(event.key)) {
      event.preventDefault()
    }
  }

  function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.currentTarget.value
    const amount = inputNumberParser(value)

    setValue(name, amount)
    trigger(name)

    onChange && onChange(event)
  }

  return (
    <InputStyled.Wrapper isRequired={required}>
      <label htmlFor={id}>{label}</label>
      <InputStyled.Container
        variant={variant}
        isFilled={isFilled}
        isFocused={isFocused}
        isErrored={isErrored}
        isDisabled={disabled}
      >
        <input
          id={id}
          name={name}
          aria-label={name}
          disabled={disabled}
          required={required}
          value={formattedValue}
          onBlur={handleOnBlur}
          onFocus={handleOnFocus}
          onKeyPress={handleOnKeyPress}
          onChange={handleOnChange}
          {...rest}
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
