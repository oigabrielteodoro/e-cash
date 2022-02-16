import styled, { css } from 'styled-components'
import { motion } from 'framer-motion'

import { theme } from 'config'
import { Container as InputContainer } from 'ui/Input/Input.styled'
import { fadeIn } from 'ui/_animations'

type Props = {
  isOpen: boolean
}

export const Container = styled(InputContainer)<Props>`
  ${({ isOpen }) =>
    isOpen &&
    css`
      border-radius: 0.5rem 0.5rem 0 0;
      border-color: ${theme.colors.neutral[300]};
      box-shadow: none;

      &:hover {
        border-color: ${theme.colors.neutral[300]};
      }

      svg {
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
`
