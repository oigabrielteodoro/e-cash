import React, {
  useRef,
  useState,
  useEffect,
  cloneElement,
  ReactElement,
  ChangeEvent,
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
  const containerRef = useRef<HTMLDivElement>(null)
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
  const [filteredOptions, setFilteredOptions] = useState(toArray(children))
  const { register, setValue } = useFormContext()

  useEffect(() => {
    register(name)
  }, [name, register])

  function handleOnClick(value = '', children = '') {
    setValue(name, value)

    if (inputRef?.current) {
      inputRef.current.value = children
    }

    setIsOpen(false)
  }

  function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
    const allOptions = toArray(children)
    const inputValue = event.currentTarget.value

    if (inputValue?.length === 0) {
      setValue(name, '')
    }

    setFilteredOptions(
      allOptions.filter((child) =>
        child.props.children.toLowerCase().includes(inputValue.toLowerCase()),
      ),
    )
  }

  return (
    <S.Wrapper>
      <InputStyled.Wrapper as='div'>
        <label htmlFor={id}>{label}</label>
        <S.Container
          ref={containerRef}
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
            onChange={handleOnChange}
            autoComplete='off'
            {...rest}
          />

          <FiChevronDown size={20} />
        </S.Container>
        {error && !isOpen && (
          <InputStyled.ErrorContainer>
            <AiOutlineExclamationCircle size={18} />
            <span>{errorMessage}</span>
          </InputStyled.ErrorContainer>
        )}
      </InputStyled.Wrapper>
      <AnimatePresence>
        {isOpen && (
          <ClickAway
            isOpen={isOpen}
            ignoredRefs={[containerRef]}
            onClose={() => setIsOpen(false)}
          >
            <S.Dropdown>
              {filteredOptions.map((child) => {
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
    </S.Wrapper>
  )
}

Select.Option = Option
