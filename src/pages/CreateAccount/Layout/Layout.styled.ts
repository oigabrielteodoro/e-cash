import styled from 'styled-components'
import { motion } from 'framer-motion'

import { Container as AuthLayoutContainer } from 'ui/AuthLayout/AuthLayout.styled'

export const Wrapper = styled.main`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100vh;
`

export const RocketImg = styled(motion.img).attrs({
  variants: {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
  },
  transition: {
    duration: 2,
    delay: 2.5,
  },
  initial: 'hidden',
  animate: 'visible',
})`
  position: absolute;
  left: -5rem;
  bottom: -5rem;
  width: 25rem;
  z-index: -1;
`

export const Container = styled(AuthLayoutContainer)`
  justify-content: normal;
  padding: 5rem;

  section {
    margin-top: 5rem;
    margin-left: 5rem;
  }
`
