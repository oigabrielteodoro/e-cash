import { theme } from 'config'
import styled, { css } from 'styled-components'

type CardProps = {
  boxShadow?: string
}

export const Card = styled.div<CardProps>`
  padding: 2.4rem;
  background: ${theme.colors.white};
  border-radius: ${theme.radius.card};
  border: 0.1rem solid ${theme.colors.neutral[300]};

  ${({ boxShadow }) =>
    boxShadow &&
    css`
      box-shadow: ${boxShadow};
    `}
`
