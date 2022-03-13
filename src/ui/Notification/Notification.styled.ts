import styled, { css } from 'styled-components'
import { motion } from 'framer-motion'

import { theme } from 'config'
import type { NotificationType } from './types'

type IconContainerProps = {
  type: NotificationType
}

const modifiers = {
  success: css`
    background: ${theme.colors.green[500]};
  `,
  error: css`
    background: ${theme.colors.red[500]};
  `,
  warning: css`
    background: ${theme.colors.yellow[500]};
  `,
  info: css`
    background: ${theme.colors.blue[500]};
  `,
}

export const IconContainer = styled.div<IconContainerProps>`
  height: 3.4rem;
  width: 3.4rem;
  border-radius: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ type }) => modifiers[type]}

  svg {
    color: ${theme.colors.white};
  }
`

export const Container = styled(motion.li).attrs({
  variants: {
    initial: {
      opacity: 0,
      transform: 'translateX(-20%)',
    },
    animate: {
      opacity: 1,
      transform: 'translateX(4rem)',
    },
    exit: {
      opacity: 0,
      transform: 'translateX(-100%)',
    },
  },
  initial: 'initial',
  animate: 'animate',
  exit: 'exit',
})`
  padding: 1.6rem;
  display: flex;
  align-items: center;
  border-radius: ${theme.radius.notification};
  background: ${theme.colors.white};
  box-shadow: ${theme.dropShadow.popover};

  span {
    margin-left: 1.6rem;
    max-width: 30rem;
  }
`
