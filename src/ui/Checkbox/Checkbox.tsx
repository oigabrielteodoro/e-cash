import React, {
  useState,
  useEffect,
  InputHTMLAttributes,
  ChangeEvent,
} from 'react'

import * as S from './Checkbox.styled'

type Props = { label: string } & InputHTMLAttributes<HTMLInputElement>

export function Checkbox({
  name,
  checked = false,
  defaultChecked = false,
  label,
  onChange,
  ...rest
}: Props) {
  const [isChecked, setIsChecked] = useState(defaultChecked)

  useEffect(() => {
    setIsChecked(checked)
  }, [checked])

  function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
    setIsChecked((prevState) => !prevState)

    onChange && onChange(event)
  }

  return (
    <S.Container>
      <input
        id={name}
        name={name}
        aria-label={label}
        type='checkbox'
        checked={isChecked}
        onChange={handleOnChange}
        {...rest}
      />
      <label htmlFor={name}>{label}</label>
    </S.Container>
  )
}
