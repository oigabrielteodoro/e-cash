import styled from 'styled-components'
import { motion } from 'framer-motion'

import { theme } from 'config'
import { fadeIn } from 'ui/_animations'

export const Wrapper = styled.main`
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  height: 100vh;
`

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 13rem;
  background: ${theme.colors.blue[100]};
  position: relative;
  z-index: ${theme.layers.base};
`

export const Title = styled(motion.h1).attrs(
  fadeIn({
    transition: {
      duration: 3,
    },
  }),
)`
  font-weight: 700;
  font-size: 5rem;
  color: ${theme.colors.blue[500]};
  max-width: 30rem;
  margin-left: 6.5rem;
  margin-top: 2.8rem;
`

export const QuoteText = styled(motion.p).attrs(
  fadeIn({
    transition: {
      delay: 1.5,
      duration: 2,
    },
  }),
)`
  font-weight: 500;
  margin-top: 6rem;
  color: ${theme.colors.neutral[500]};
  margin-left: 10rem;
  width: 30rem;
  position: relative;
`

export const AccountContainer = styled(motion.div).attrs(
  fadeIn({
    transition: {
      delay: 1.7,
      duration: 2,
    },
  }),
)`
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
    color: ${theme.colors.blue[900]};
  }

  span {
    color: ${theme.colors.neutral[500]};
    font-size: ${theme.font.sizes.small};
    margin-top: 0.4rem;
  }
`

export const LogoContainer = styled(motion.div).attrs(
  fadeIn({
    transition: {
      duration: 2,
    },
  }),
)`
  display: flex;
  align-items: center;
`

export const LogoTypography = styled.div`
  margin-left: 2rem;

  span {
    color: ${theme.colors.neutral[500]};
  }
`
