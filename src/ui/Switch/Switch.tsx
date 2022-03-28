import React, {
  ChangeEvent,
  InputHTMLAttributes,
  useEffect,
  useState,
} from 'react'
import { useFormContext } from 'react-hook-form'

import * as S from './Switch.styled'

type SwitchProps = {
  label: string
  name: string
} & InputHTMLAttributes<HTMLElement>

export function Switch({
  name,
  id = name,
  label,
  defaultChecked,
  onChange,
  ...rest
}: SwitchProps) {
  const [isChecked, setIsChecked] = useState(!!defaultChecked)

  const { register, watch, setValue } = useFormContext()

  const value = watch(name)

  useEffect(() => {
    register(name)
  }, [name, register])

  useEffect(() => {
    if (value !== isChecked) {
      setIsChecked(value)
    }
  }, [value, isChecked])

  function handleOnChange(event?: ChangeEvent<HTMLInputElement>) {
    setIsChecked((prevState) => {
      const newValue = !prevState

      setValue(name, newValue)

      return newValue
    })

    event && onChange && onChange(event)
  }

  return (
    <S.Wrapper>
      <S.Container
        type='button'
        checked={isChecked}
        onClick={() => handleOnChange()}
      />
      <input
        id={id}
        name={name}
        type='switch'
        checked={isChecked}
        onChange={handleOnChange}
        onClick={() => handleOnChange()}
        role='switch'
        aria-label={name}
        {...rest}
      />
      <label htmlFor={id}>{label}</label>
    </S.Wrapper>
  )
}
