import styled, { css } from 'styled-components'
import { motion } from 'framer-motion'

import { theme } from 'config'
import { Container as InputContainer } from 'ui/Input/Input.styled'
import { fadeIn } from 'ui/_animations'

type Props = {
  isOpen: boolean
}

export const Wrapper = styled.fieldset`
  border: 0;
  position: relative;
`

export const Container = styled(InputContainer)<Props>`
  height: 5.65rem;

  ${({ isOpen }) =>
    isOpen &&
    css`
      border-radius: 0.5rem 0.5rem 0 0;
      border-color: ${theme.colors.neutral[300]};
      box-shadow: none;

      input {
        transition: 300ms;
        color: ${theme.colors.neutral[500]};
      }

      &:hover {
        border-color: ${theme.colors.neutral[300]};
      }

      > svg {
        transform: rotate(-180deg);
      }
    `}
`

export const Dropdown = styled(motion.ul).attrs(fadeIn())`
  position: absolute;
  background: ${theme.colors.white};
  width: 100%;
  top: calc(100% - 0.1rem);
  border: 0.1rem solid ${theme.colors.neutral[300]};
  border-radius: 0 0 ${theme.radius.popover} ${theme.radius.popover};
  z-index: ${theme.layers.alwaysOnTop};
`

export const LoadState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: ${theme.colors.neutral[500]};
  padding: 1.6rem;

  span {
    margin-top: 0.8rem;
  }
`

export const OptionElementSelected = styled.div`
  margin-left: 1rem;
`
