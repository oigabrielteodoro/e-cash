import styled, { css } from 'styled-components'
import { motion } from 'framer-motion'

import { theme } from 'config'
import type { PopoverProps } from 'ui'

type Props = Required<Pick<PopoverProps, 'position' | 'customWidth'>>
type IndicatorProps = Required<Pick<PopoverProps, 'position'>>

const modifiers = {
  top: css`
    top: 0;
    transform: translateY(calc(-100% - 1.6rem));
  `,
  bottom: css`
    bottom: calc(-100% - 0.8rem);
  `,
  right: css`
    left: calc(100% + 0.8rem);
    top: 50%;
    transform: translateY(-50%);
  `,
  left: css`
    left: calc(-100% - 0.8rem);
    top: 0;
  `,
}

const arrowModifiers = {
  top: css`
    bottom: -0.8rem;
    top: -2.2rem;
    left: 50%;
    transform: translateX(-50%) rotate(-45deg);
    border-top-color: transparent;
    border-right-color: transparent;
  `,
  bottom: css``,
  right: css`
    top: 50%;
    left: calc(100% + 0.4rem);
    transform: translateY(-50%) rotate(-45deg);
    border-bottom-color: transparent;
    border-right-color: transparent;
  `,
  left: css``,
}

const fadeIn = {
  variants: {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
  },
  initial: 'hidden',
  animate: 'visible',
  exit: 'hidden',
}

export const Wrapper = styled.div`
  width: 100%;
  position: relative;
`

export const Container = styled.button`
  width: 100%;
  border: 0;
  background: transparent;
  transition: 300ms;
`

export const Popover = styled(motion.div).attrs(fadeIn)<Props>`
  width: ${({ customWidth }) => customWidth};
  border-radius: ${theme.radius.popover};
  background: ${theme.colors.white};
  box-shadow: ${theme.dropShadow.popover};
  border: 0.1rem solid ${theme.colors.neutral[200]};
  position: absolute;
  z-index: ${theme.layers.base};

  ${({ position }) => modifiers[position]}
`

export const Indicator = styled(motion.div).attrs(fadeIn)<IndicatorProps>`
  position: absolute;
  background: ${theme.colors.white};
  height: 1rem;
  width: 1rem;
  border: 0.1rem solid ${theme.colors.neutral[200]};
  z-index: ${theme.layers.alwaysOnTop};

  ${({ position }) => arrowModifiers[position]};
`
