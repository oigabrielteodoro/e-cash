import styled, { css } from 'styled-components'
import { motion } from 'framer-motion'

import { theme } from 'config'
import type { PopoverProps } from 'ui'

type Props = Required<Pick<PopoverProps, 'position' | 'customWidth'>>
type PopoverArrowProps = Required<Pick<PopoverProps, 'position'>>

const modifiers = {
  top: css`
    top: 0;
    transform: translateY(calc(-100% - 1.6rem));
  `,
  bottom: css`
    bottom: calc(-100% - 0.8rem);
  `,
  right: css`
    right: calc(-100% - 0.8rem);
    top: 0;
  `,
  left: css`
    left: calc(-100% - 0.8rem);
    top: 0;
  `,
}

const arrowModifiers = {
  top: css`
    bottom: -0.8rem;
    top: -1.6rem;
    left: 50%;
    transform: translateX(-50%);
    border-bottom-width: 0;
    border-top-color: ${theme.colors.white};
  `,
  bottom: css``,
  right: css``,
  left: css``,
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

export const Popover = styled(motion.div).attrs({
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
})<Props>`
  width: ${({ customWidth }) => customWidth};
  border-radius: 0.5rem;
  background: ${theme.colors.white};
  box-shadow: 0 0 10rem 1rem rgba(0, 0, 0, 0.1);
  position: absolute;
  z-index: 1;

  ${({ position }) => modifiers[position]}
`

export const PopoverArrow = styled.div<PopoverArrowProps>`
  position: absolute;
  border-style: solid;
  border-width: 0.8rem;
  border-color: transparent;
  height: 1.6rem;
  z-index: 1;

  ${({ position }) => arrowModifiers[position]};
`
