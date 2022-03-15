import styled from 'styled-components'
import { theme } from 'config'

export const Title = styled.h3`
  font-weight: 600;
  text-align: center;
`

export const Description = styled.p`
  margin-top: 1.6rem;
  margin-bottom: 2.4rem;
  text-align: center;
  font-size: ${theme.font.sizes.small};
`
