import styled from 'styled-components'
import { motion } from 'framer-motion'

import { theme } from 'config'

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  height: 100vh;
`

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 13rem;

  background: radial-gradient(
      91.91% 75.66% at 10.55% 47.97%,
      rgba(48, 79, 252, 0.2) 0%,
      rgba(0, 0, 0, 0) 100%
    ),
    #060c30;
`

export const Title = styled(motion.h1).attrs({
  initial: 'hidden',
  animate: 'visible',
  variants: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  transition: {
    duration: 3,
  },
})`
  font-weight: 600;
  font-size: 6.8rem;
  color: ${theme.colors.white};
  max-width: 30rem;
  margin-left: 5rem;
`

export const QuoteText = styled(motion.p).attrs({
  initial: 'hidden',
  animate: 'visible',
  exit: 'hidden',
  variants: {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
  },
  transition: {
    delay: 1.5,
    duration: 2,
  },
})`
  font-weight: 500;
  margin-top: 6rem;
  color: ${theme.colors.blue[300]};
  margin-left: 10rem;
  width: 30rem;
  position: relative;
`

export const AccountContainer = styled(motion.div).attrs({
  initial: 'hidden',
  animate: 'visible',
  variants: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  transition: {
    delay: 1.7,
    duration: 2,
  },
})`
  display: flex;
  align-items: center;
  margin-left: 10rem;
  margin-top: 3rem;

  img {
    width: 4.5rem;
    height: 4.5rem;
    border-radius: 50%;
  }
`

export const AccountContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 1.6rem;

  strong {
    font-weight: 500;
    color: ${theme.colors.white};
  }

  span {
    color: ${theme.colors.blue[300]};
    font-size: ${theme.font.sizes.small};
    margin-top: 0.4rem;
  }
`
