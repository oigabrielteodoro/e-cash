import React, {
  useState,
  forwardRef,
  InputHTMLAttributes,
  KeyboardEvent,
  ChangeEvent,
  FocusEvent,
  ForwardRefRenderFunction,
} from 'react'
import { FiDollarSign } from 'react-icons/fi'
import { AiOutlineExclamationCircle } from 'react-icons/ai'

import { pipe } from 'fp-ts/function'
import { fromNullable, map } from 'fp-ts/Option'

import { useInput } from 'hooks'
import { toDecimal } from 'lib'

import * as InputStyled from '../Input.styled'

export type AmountInputProps = {
  label: string
  error?: string
  variant?: 'primary' | 'secondary'
  defaultValue?: string
} & InputHTMLAttributes<HTMLInputElement>

function inputNumberParser(value?: string): string {
  return value ? value.replace(/\W/g, '') : ''
}

const ForwardAmountInput: ForwardRefRenderFunction<
  HTMLInputElement,
  AmountInputProps
> = (
  {
    id,
    name,
    variant = 'primary',
    label,
    defaultValue,
    error,
    onChange,
    onFocus,
    onBlur,
    ...rest
  },
  ref,
) => {
  const { isErrored, errorMessage } = useInput({
    defaultValue,
    error,
  })

  const [isFocused, setIsFocused] = useState(false)

  const [displayValue, setDisplayValue] = useState<string>(defaultValue ?? '')
  const formattedValue = displayValue
    ? toDecimal(inputNumberParser(displayValue))
    : undefined

  function handleOnKeyPress(event: KeyboardEvent<HTMLInputElement>) {
    if (!/[0-9]/.test(event.key)) event.preventDefault()
  }

  function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
    pipe(
      event.currentTarget.value,
      fromNullable,
      map((amount) => {
        const parsedAmount = inputNumberParser(amount)

        setDisplayValue(parsedAmount)

        onChange &&
          onChange({
            ...event,
            currentTarget: {
              ...event.currentTarget,
              value: parsedAmount,
            },
          })
      }),
    )
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
          ref={ref}
          name={name}
          aria-label={name}
          value={formattedValue}
          defaultValue={defaultValue}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          onChange={handleOnChange}
          onKeyPress={handleOnKeyPress}
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

export const AmountInput = forwardRef(ForwardAmountInput)
