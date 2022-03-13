import { useInput } from 'lib'
import React, {
  useState,
  forwardRef,
  ForwardRefRenderFunction,
  TextareaHTMLAttributes,
  ChangeEvent,
} from 'react'
import { AiOutlineExclamationCircle } from 'react-icons/ai'

import * as InputStyled from '../Input.styled'
import * as S from './TextAreaInput.styled'

export type TextAreaInputProps = {
  label: string
  maxLength?: number
  error?: string
  variant?: 'primary' | 'secondary'
} & TextareaHTMLAttributes<HTMLTextAreaElement>

const ForwardTextAreaInput: ForwardRefRenderFunction<
  HTMLTextAreaElement,
  TextAreaInputProps
> = (
  {
    name,
    id = name,
    label,
    maxLength,
    variant = 'primary',
    error,
    onChange,
    onBlur,
    onFocus,
    ...rest
  },
  ref,
) => {
  const {
    isErrored,
    isFilled,
    isFocused,
    errorMessage,
    handleOnBlur,
    handleOnFocus,
  } = useInput({
    error,
    onBlur,
    onFocus,
  })

  const [valueLength, setValueLength] = useState(0)

  function handleOnChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setValueLength(event.currentTarget.value.length)

    onChange && onChange(event)
  }

  return (
    <InputStyled.Wrapper>
      <label htmlFor={id}>{label}</label>
      <InputStyled.Container
        isFilled={isFilled}
        isFocused={isFocused}
        isErrored={isErrored}
        variant={variant}
      >
        <textarea
          id={id}
          name={name}
          ref={ref}
          maxLength={maxLength}
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          onFocus={handleOnFocus}
          {...rest}
        />
      </InputStyled.Container>
      {error && (
        <InputStyled.ErrorContainer>
          <AiOutlineExclamationCircle size={18} />
          <span>{errorMessage}</span>
        </InputStyled.ErrorContainer>
      )}
      {maxLength && (
        <S.ValueLengthText>
          {valueLength} / {maxLength}
        </S.ValueLengthText>
      )}
    </InputStyled.Wrapper>
  )
}

export const TextAreaInput = forwardRef(ForwardTextAreaInput)
