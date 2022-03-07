import React, {
  cloneElement,
  useEffect,
  useMemo,
  useRef,
  useState,
  ReactElement,
  ChangeEvent,
} from 'react'
import { useFormContext } from 'react-hook-form'

import toArray from 'lodash/toArray'

import { constNull, pipe } from 'fp-ts/function'
import { fold, fromNullable } from 'fp-ts/Option'

import { SelectProps } from '../Select'

import * as S from '../Select.styled'

type UseSelectParams = Pick<SelectProps, 'children' | 'name' | 'defaultValue'>

type OnClickParams = {
  value: string
  displayValue: string
}

export function useSelect({ children, name, defaultValue }: UseSelectParams) {
  const inputRef = useRef<HTMLInputElement>(null)

  const { register, setValue, trigger, watch } = useFormContext()

  const [isOpen, setIsOpen] = useState(false)
  const [filteredOptions, setFilteredOptions] = useState<ReactElement[]>([])

  const value = watch(name)

  useEffect(() => {
    register(name)
  }, [name, register])

  useEffect(() => {
    const allOptions = toArray(children)

    setFilteredOptions(allOptions)
  }, [children])

  useEffect(() => {
    if (defaultValue && inputRef?.current) {
      const allOptions = toArray(children)
      const foundOption = allOptions.find(
        (option) => option.props.value === defaultValue,
      )

      if (foundOption) {
        inputRef.current.value = foundOption.props.displayValue
      }
    }
  }, [defaultValue, children])

  const selectedOptionElement = useMemo(() => {
    const selectedOption = filteredOptions.find(
      (option) => option.props.value === value,
    )

    return pipe(
      selectedOption,
      fromNullable,
      fold(constNull, (element) => {
        if (isValidElement(element)) {
          const { props } = element

          return cloneElement(
            <S.OptionElementSelected>{props.children}</S.OptionElementSelected>,
            props,
          )
        }
      }),
    )
  }, [value, filteredOptions])

  function handleOnClick({ value, displayValue }: OnClickParams) {
    setValue(name, value)

    if (inputRef?.current) {
      inputRef.current.value = displayValue
    }

    setIsOpen(false)
    trigger(name)
  }

  function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
    const allOptions = toArray(children)
    const inputValue = event.currentTarget.value

    if (inputValue?.length === 0) {
      setValue(name, '')
    }

    setFilteredOptions(
      allOptions.filter((child) =>
        child.props.displayValue
          .toLowerCase()
          .includes(inputValue.toLowerCase()),
      ),
    )
  }

  function handleClose() {
    setIsOpen(false)
  }

  function handleOpen() {
    setIsOpen(true)
  }

  return {
    isOpen,
    selectedOptionElement,
    filteredOptions,
    inputRef,
    handleOpen,
    handleClose,
    handleOnClick,
    handleOnChange,
  }
}

function isValidElement(element: ReactElement) {
  return !!element?.props?.children
}
