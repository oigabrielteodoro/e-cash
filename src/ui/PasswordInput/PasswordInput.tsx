import React, {
  useState,
  InputHTMLAttributes,
  forwardRef,
  ForwardRefRenderFunction,
} from 'react'
import { AiOutlineLock, AiOutlineUnlock } from 'react-icons/ai'
import type { IconBaseProps } from 'react-icons'

import { Input } from 'ui'

import * as S from './PasswordInput.styled'

type Props = {
  label: string
  error?: string
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>

const ForwardPasswordInput: ForwardRefRenderFunction<HTMLInputElement, Props> =
  ({ ...rest }: Props, ref) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    const type = isPasswordVisible ? 'text' : 'password'

    function handleOnClick() {
      setIsPasswordVisible((prevState) => !prevState)
    }

    function ControlButton(props: IconBaseProps) {
      return (
        <S.Button type='button' onClick={handleOnClick}>
          {isPasswordVisible ? (
            <AiOutlineUnlock {...props} />
          ) : (
            <AiOutlineLock {...props} />
          )}
        </S.Button>
      )
    }

    return <Input type={type} ref={ref} icon={ControlButton} {...rest} />
  }

export const PasswordInput = forwardRef(ForwardPasswordInput)
