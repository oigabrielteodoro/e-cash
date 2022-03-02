import { theme } from 'config'
import styled from 'styled-components'

export const Card = styled.div`
  padding: 2.4rem;
  background: ${theme.colors.white};
  border-radius: ${theme.radius.card};
  box-shadow: ${theme.dropShadow.popover};
  border: 0.1rem solid ${theme.colors.neutral[300]};
`
