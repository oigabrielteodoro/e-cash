import React, {
  forwardRef,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
  useState,
} from 'react'

import * as S from './Switch.styled'

type SwitchProps = {
  label: string
} & InputHTMLAttributes<HTMLElement>

const ForwardSwitch: ForwardRefRenderFunction<HTMLInputElement, SwitchProps> = (
  { id, label, defaultChecked, ...rest },
  ref,
) => {
  const [isChecked, setIsChecked] = useState(!!defaultChecked)

  return (
    <S.Wrapper>
      <S.Container
        type='button'
        checked={isChecked}
        onClick={() => setIsChecked((prevState) => !prevState)}
      />
      <input
        hidden
        type='switch'
        checked={isChecked}
        id={id}
        ref={ref}
        {...rest}
      />
      <label htmlFor={id}>{label}</label>
    </S.Wrapper>
  )
}

export const Switch = forwardRef(ForwardSwitch)
