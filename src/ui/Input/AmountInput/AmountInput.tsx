import React, {
  useState,
  useEffect,
  InputHTMLAttributes,
  KeyboardEvent,
  ChangeEvent,
  FocusEvent,
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
  defaultValue,
  error,
  onFocus,
  onBlur,
  ...rest
}: AmountInputProps) {
  const { isErrored, errorMessage } = useInput({
    defaultValue,
    error,
  })

  const { register, setValue } = useFormContext()

  useEffect(() => {
    register(name)

    if (defaultValue) {
      setValue(name, defaultValue)
    }
  }, [name, defaultValue, register, setValue])

  const [isFocused, setIsFocused] = useState(false)
  const [displayValue, setDisplayValue] = useState<string>('')

  const formattedValue = displayValue
    ? toDecimal(inputNumberParser(displayValue))
    : undefined

  function handleOnKeyPress(event: KeyboardEvent<HTMLInputElement>) {
    if (!/[0-9]/.test(event.key)) event.preventDefault()
  }

  function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.currentTarget.value
    const amount = inputNumberParser(value)

    setDisplayValue(amount)

    setValue(name, amount)
  }

  function handleOnFocus(event: FocusEvent<HTMLInputElement>) {
    setIsFocused(true)

    onFocus && onFocus(event)
  }

  function handleOnBlur(event: FocusEvent<HTMLInputElement>) {
    setIsFocused(false)

    onBlur && onBlur(event)
  }

  return (
    <InputStyled.Wrapper>
      <label htmlFor={id}>{label}</label>
      <InputStyled.Container
        variant={variant}
        isFilled={false}
        isFocused={isFocused}
        isErrored={isErrored}
      >
        <input
          id={id}
          name={name}
          aria-label={name}
          value={formattedValue}
          defaultValue={defaultValue}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
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
