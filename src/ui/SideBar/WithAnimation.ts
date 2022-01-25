import styled from 'styled-components'
import { motion } from 'framer-motion'

type Props = {
  duration?: number
}

export const attributes = {
  initial: 'hidden',
  animate: 'visible',
  exit: 'hidden',
  variants: {
    hidden: {
      opacity: 0,
      translateX: '-1.6rem',
    },
    visible: {
      opacity: 1,
      translateX: '1.6rem',
    },
  },
  transition: {
    duration: 0.3,
  },
}

export const TextWithAnimation = styled(motion.span).attrs(attributes)``

export const TextBoldWithAnimation = styled(motion.strong).attrs(
  attributes,
)<Props>``

export const ContainerWithAnimation = styled(motion.div).attrs(attributes)``
