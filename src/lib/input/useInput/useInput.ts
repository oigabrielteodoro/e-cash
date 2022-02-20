import { useState, FocusEvent } from 'react'

import capitalize from 'lodash/capitalize'
import { InputProps } from 'ui'

type Props = Pick<InputProps, 'defaultValue' | 'error' | 'onFocus' | 'onBlur'>

export function useInput({ defaultValue, error, onBlur, onFocus }: Props) {
  const [isFilled, setIsFilled] = useState(!!defaultValue)
  const [isFocused, setIsFocused] = useState(false)

  const isErrored = !!error
  const errorMessage = isErrored ? capitalize(error) : ''

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

  return {
    isFilled,
    isFocused,
    isErrored,
    errorMessage,
    handleOnBlur,
    handleOnFocus,
  }
}
