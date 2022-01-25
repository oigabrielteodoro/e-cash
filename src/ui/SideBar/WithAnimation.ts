import styled from 'styled-components'
import { motion } from 'framer-motion'

export const attributes = {
  initial: 'hidden',
  animate: 'visible',
  exit: 'hidden',
  variants: {
    hidden: {
      opacity: 0,
      translateX: '-1.6rem',
      transition: {
        duration: 0.3,
      },
    },
    visible: {
      opacity: 1,
      translateX: '1.6rem',
      transition: {
        duration: 0.3,
      },
    },
  },
}

export const WithTextAnimation = styled(motion.span).attrs(attributes)``

export const WithTextBoldAnimation = styled(motion.strong).attrs(attributes)``

export const ContainerWithAnimation = styled(motion.div).attrs(attributes)``
