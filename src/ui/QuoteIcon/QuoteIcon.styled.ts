import styled, { keyframes } from 'styled-components'
import { motion } from 'framer-motion'
import { theme } from 'config'

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`

export const Container = styled.div`
  position: relative;
  margin-bottom: 1.6rem;
  max-width: 5.2rem;

  svg {
    animation: ${fadeIn} 3s;
  }
`

export const Line = styled(motion.div).attrs({
  initial: 'hidden',
  animate: 'visible',
  exit: 'hidden',
  variants: {
    hidden: { height: 0 },
    visible: { height: 350 },
  },
  transition: {
    duration: 2,
  },
})`
  position: absolute;
  background: ${theme.colors.neutral[300]};
  width: 0.2rem;
  left: 50%;
  transform: translateX(-50%);
  top: calc(100% + 1.6rem);
`

export const HorizontalLine = styled(motion.div).attrs({
  initial: 'hidden',
  animate: 'visible',
  exit: 'hidden',
  variants: {
    hidden: { width: 0 },
    visible: { width: 40 },
  },
  transition: {
    delay: 1.2,
    duration: 2,
  },
})`
  height: 0.2rem;
  position: absolute;
  background: ${theme.colors.neutral[300]};
  width: 4rem;
  top: calc(100% + 26rem);
  left: calc(100% + -2.5rem);
`
