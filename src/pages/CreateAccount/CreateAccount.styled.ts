import styled, { css } from 'styled-components'
import { motion } from 'framer-motion'

import { theme } from 'config'
import { fadeIn } from 'ui/_animations'

type ContainerProps = {
  isSuccess?: boolean
}

export const Container = styled(motion.section).attrs(
  fadeIn({
    transition: {
      duration: 2,
    },
  }),
)<ContainerProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10rem 17rem 4rem;

  ${({ isSuccess }) =>
    isSuccess &&
    css`
      padding-bottom: 10rem;
    `}

  strong {
    font-size: 2rem;
    font-weight: 500;
  }

  p {
    margin-top: 0.8rem;
    color: ${theme.colors.neutral[500]};
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

export const Success = styled.div`
  margin: auto 0;
`
