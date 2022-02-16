import React, {
  useRef,
  useState,
  useEffect,
  cloneElement,
  ReactElement,
} from 'react'
import { AiOutlineExclamationCircle } from 'react-icons/ai'
import { FiChevronDown } from 'react-icons/fi'
import { AnimatePresence } from 'framer-motion'
import { useFormContext } from 'react-hook-form'

import toArray from 'lodash/toArray'

import { ClickAway, InputProps } from 'ui'
import { useInput } from 'hooks'

import * as InputStyled from 'ui/Input/Input.styled'

import { Option, OptionProps } from './Option'

import * as S from './Select.styled'

type SelectProps = {
  name: string
  children: ReactElement<OptionProps>[]
} & Omit<InputProps, 'icon'>

export function Select({
  id,
  name,
  label,
  variant = 'primary',
  defaultValue,
  error,
  children,
  onBlur,
  onFocus,
  ...rest
}: SelectProps) {
  const inputRef = useRef<HTMLInputElement>(null)

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

  const [isOpen, setIsOpen] = useState(false)
  const { register, unregister, setValue } = useFormContext()

  useEffect(() => {
    register(name)

    return () => unregister(name)
  }, [name, register, unregister])

  const options = toArray(children)

  function handleOnClick(value = '', children = '') {
    setValue(name, value)

    if (inputRef?.current) {
      inputRef.current.value = children
    }

    setIsOpen(false)
  }

  return (
    <InputStyled.Wrapper>
      <label htmlFor={id}>{label}</label>
      <S.Container
        variant={variant}
        isOpen={isOpen}
        isFilled={isFilled}
        isFocused={isFocused}
        isErrored={isErrored}
        onClick={() => setIsOpen(true)}
      >
        <input
          id={id}
          ref={inputRef}
          name={name}
          aria-label={name}
          defaultValue={defaultValue}
          onBlur={handleOnBlur}
          onFocus={handleOnFocus}
          autoComplete='off'
          {...rest}
        />

        <FiChevronDown size={20} />
      </S.Container>
      {error && (
        <InputStyled.ErrorContainer>
          <AiOutlineExclamationCircle size={18} />
          <span>{errorMessage}</span>
        </InputStyled.ErrorContainer>
      )}

      <AnimatePresence>
        {isOpen && (
          <ClickAway
            ignoredRefs={[inputRef]}
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
          >
            <S.Dropdown>
              {options.map((child) => {
                const props = {
                  ...child.props,
                  key: `Select.Option.${child.props.value}`,
                  onClick: () =>
                    handleOnClick(child.props.value, child.props.children),
                }

                return cloneElement(child, props)
              })}
            </S.Dropdown>
          </ClickAway>
        )}
      </AnimatePresence>
    </InputStyled.Wrapper>
  )
}

Select.Option = Option
