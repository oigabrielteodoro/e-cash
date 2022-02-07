import styled from 'styled-components'
import { motion } from 'framer-motion'

import { theme } from 'config'

export const Container = styled.div`
  position: fixed;
  backdrop-filter: blur(0.1rem);
  overflow: none;
  z-index: ${theme.layers.base};
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.1);
`

export const Dialog = styled(motion.div).attrs({
  variants: {
    hidden: {
      opacity: 0,
      scale: 0.7,
      transition: {
        duration: 0.2,
      },
    },
    visible: {
      opacity: 1,
      scale: 1,
    },
  },
  initial: 'hidden',
  animate: 'visible',
  exit: 'hidden',
})`
  padding: 4.5rem;
  min-width: 40rem;
  position: relative;
  background: ${theme.colors.white};
  border-radius: ${theme.radius.modal};
  box-shadow: ${theme.dropShadow.popover};
  display: flex;
  flex-direction: column;
`

export const CloseButton = styled.button`
  border: 0;
  display: grid;
  position: absolute;
  place-items: center;
  background: transparent;
  color: ${theme.colors.neutral[500]};
  border-radius: ${theme.radius.popover};
  top: 1rem;
  right: 1rem;
  width: 4.2rem;
  height: 4.2rem;
  transition: 300ms;

  &:hover {
    background: ${theme.colors.neutral[100]};
  }
`
