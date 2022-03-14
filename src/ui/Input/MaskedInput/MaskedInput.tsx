import React, {
  useEffect,
  InputHTMLAttributes,
  ComponentType,
  ChangeEvent,
} from 'react'
import { AiOutlineExclamationCircle } from 'react-icons/ai'
import { useFormContext } from 'react-hook-form'

import type { IconBaseProps } from 'react-icons'

import { useInput, toMask, unMask, isResolvedMask } from 'lib'

import * as S from '../Input.styled'

export type MaskedInputProps = {
  mask: string[]
  name: string
  label: string
  error?: string
  variant?: 'primary' | 'secondary'
  icon: ComponentType<IconBaseProps>
} & InputHTMLAttributes<HTMLInputElement>

export function MaskedInput({
  mask,
  defaultValue,
  label,
  error,
  variant = 'primary',
  icon: Icon,
  name,
  id = name,
  onBlur,
  onFocus,
  onChange,
  ...rest
}: MaskedInputProps) {
  const { register, watch, trigger, setValue } = useFormContext()

  const value = watch(name)

  const {
    isFilled,
    isFocused,
    isErrored,
    errorMessage,
    handleOnBlur,
    handleOnFocus,
    setIsFilled,
  } = useInput({
    defaultValue,
    error,
    onBlur,
    onFocus,
  })

  useEffect(() => {
    register(name)
  }, [name, register])

  useEffect(() => {
    if (value) {
      setIsFilled(true)
    }
  }, [value, setIsFilled])

  const maskedValue = toMask(value, mask)

  function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
    if (isResolvedMask(event.currentTarget.value, mask)) return

    setValue(name, unMask(event.currentTarget.value))
    trigger(name)

    onChange && onChange(event)
  }

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
          name={name}
          aria-label={name}
          defaultValue={defaultValue}
          onBlur={handleOnBlur}
          onFocus={handleOnFocus}
          onChange={handleOnChange}
          role='textbox'
          value={maskedValue}
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
