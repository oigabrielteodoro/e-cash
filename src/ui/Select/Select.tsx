import React, { useRef, cloneElement, ReactElement } from 'react'
import { AiOutlineExclamationCircle } from 'react-icons/ai'
import { FiChevronDown, FiX } from 'react-icons/fi'
import { AnimatePresence } from 'framer-motion'

import { LoadIcon, ClickOutsideElement, InputProps } from 'ui'
import { useInput } from 'lib'

import * as InputStyled from 'ui/Input/Input.styled'

import { Option, OptionProps } from './Option'

import { useSelect } from './useSelect'
import * as S from './Select.styled'

export type SelectProps = {
  name: string
  children: ReactElement<OptionProps>[]
  loading?: boolean
  renderOptionElementWhenIsSelected?: boolean
} & Omit<InputProps, 'icon'>

export function Select({
  name,
  id = name,
  label,
  variant = 'primary',
  defaultValue,
  error,
  children,
  loading,
  renderOptionElementWhenIsSelected = false,
  onBlur,
  onFocus,
  ...rest
}: SelectProps) {
  const containerRef = useRef<HTMLDivElement>(null)

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

  const {
    value,
    inputRef,
    isOpen,
    filteredOptions,
    selectedOptionElement,
    handleOpen,
    handleClose,
    handleOnChange,
    handleOnClick,
    handleClearValue,
  } = useSelect({
    children,
    name,
    defaultValue,
  })

  const inputIsHidden =
    renderOptionElementWhenIsSelected && !!selectedOptionElement

  return (
    <S.Wrapper>
      <InputStyled.Wrapper as='div'>
        <S.Container
          ref={containerRef}
          variant={variant}
          isOpen={isOpen}
          isFilled={isFilled}
          isFocused={isFocused}
          isErrored={isErrored}
          onClick={handleOpen}
        >
          <label htmlFor={id}>{label}</label>
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
            role='combobox'
            hidden={inputIsHidden}
            {...rest}
          />

          {inputIsHidden && selectedOptionElement}

          {!!value && (
            <S.ClearSelectButton type='button' onClick={handleClearValue}>
              <FiX size={12} />
            </S.ClearSelectButton>
          )}

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
          <ClickOutsideElement
            isOpen={isOpen}
            ignoredRefs={[containerRef]}
            onClose={handleClose}
          >
            {loading ? (
              <S.Dropdown>
                <S.LoadState>
                  <LoadIcon size={28} />
                </S.LoadState>
              </S.Dropdown>
            ) : (
              <S.Dropdown>
                {filteredOptions.map((child) => {
                  const { value, displayValue } = child.props

                  const props = {
                    ...child.props,
                    key: `Select.Option.${value}`,
                    onClick: () =>
                      handleOnClick({
                        value,
                        displayValue,
                      }),
                  }

                  return cloneElement(child, props)
                })}
              </S.Dropdown>
            )}
          </ClickOutsideElement>
        )}
      </AnimatePresence>
    </S.Wrapper>
  )
}

Select.Option = Option
