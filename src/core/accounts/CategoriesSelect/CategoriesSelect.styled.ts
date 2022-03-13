import { theme } from 'config'
import styled from 'styled-components'

export const CategoryOption = styled.div`
  display: flex;
  align-items: center;
`

export const IconContainer = styled.div`
  background: ${theme.colors.blue[100]};
  border-radius: 0.5rem;
  height: 3.2rem;
  width: 3.2rem;
  margin-right: 1rem;
  display: grid;
  place-items: center;

  svg {
    color: ${theme.colors.blue[500]};
  }
`
