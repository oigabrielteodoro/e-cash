import styled, { css } from 'styled-components'
import { motion } from 'framer-motion'

import { theme } from 'config'
import type { NotificationType } from './types'

type ContainerProps = {
  type: NotificationType
}

export const IconContainer = styled.div`
  height: 3.4rem;
  width: 3.4rem;
  border-radius: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    color: ${theme.colors.white};
  }
`

const modifiers = {
  success: css`
    background: ${theme.colors.green[100]};
    border: 0.2rem solid ${theme.colors.green[200]};

    ${IconContainer} {
      background: ${theme.colors.green[500]};
    }
  `,
  error: css`
    background: ${theme.colors.red[100]};
    border: 0.2rem solid ${theme.colors.red[200]};

    ${IconContainer} {
      background: ${theme.colors.red[500]};
    }
  `,
  warning: css`
    background: ${theme.colors.yellow[100]};
    border: 0.2rem solid ${theme.colors.yellow[200]};

    ${IconContainer} {
      background: ${theme.colors.yellow[500]};
    }
  `,
  info: css`
    background: ${theme.colors.blue[100]};
    border: 0.2rem solid ${theme.colors.blue[200]};

    ${IconContainer} {
      background: ${theme.colors.blue[500]};
    }
  `,
}

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
})<ContainerProps>`
  padding: 1.2rem;
  display: flex;
  align-items: center;
  border-radius: ${theme.radius.notification};

  span {
    margin-left: 1.2rem;
    max-width: 30rem;
  }

  ${({ type }) => modifiers[type]}
`
