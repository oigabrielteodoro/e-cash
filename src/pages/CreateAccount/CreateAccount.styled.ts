import styled from 'styled-components'
import { motion } from 'framer-motion'

import { Wrapper as InputWrapper } from 'ui/Input/Input.styled'

import { theme } from 'config'
import { fadeIn } from 'ui/_animations'

export const Container = styled(motion.section).attrs(
  fadeIn({
    transition: {
      duration: 2,
    },
  }),
)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10rem 17rem 4rem;

  strong {
    font-size: 2rem;
    font-weight: 500;
  }

  p {
    margin-top: 0.8rem;
    color: ${theme.colors.neutral[500]};
  }
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 5rem;

  ${InputWrapper} {
    margin-top: 1.6rem;
  }

  button {
    margin-top: 2rem;
  }
`

export const AlreadyHaveAccount = styled.span`
  font-size: ${theme.font.sizes.small};
  text-align: center;
  margin-top: auto;

  a {
    color: ${theme.colors.blue[500]};
    font-weight: 600;
    transition: 300ms;

    &:hover {
      opacity: 0.8;
    }
  }
`
