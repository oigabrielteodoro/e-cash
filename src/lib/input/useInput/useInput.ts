import { useState, FocusEvent, FocusEventHandler } from 'react'

import capitalize from 'lodash/capitalize'

import type { InputProps } from 'ui'

type OnFocusEventHandler =
  | FocusEventHandler<HTMLTextAreaElement>
  | FocusEventHandler<HTMLInputElement>

type FocusEventParams = FocusEvent<HTMLInputElement> &
  FocusEvent<HTMLTextAreaElement>

export type UseInputParams = {
  onBlur?: OnFocusEventHandler
  onFocus?: OnFocusEventHandler
} & Pick<InputProps, 'defaultValue' | 'error'>

export function useInput({
  defaultValue,
  error,
  onBlur,
  onFocus,
}: UseInputParams) {
  const [isFilled, setIsFilled] = useState(!!defaultValue)
  const [isFocused, setIsFocused] = useState(false)

  const isErrored = !!error
  const errorMessage = isErrored ? capitalize(error) : ''

  function handleOnBlur(event: FocusEventParams) {
    event.preventDefault()

    setIsFocused(false)
    setIsFilled(!!event.target.value)

    onBlur && onBlur(event)
  }

  function handleOnFocus(event: FocusEventParams) {
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
    setIsFilled,
  }
}
