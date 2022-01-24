import styled from 'styled-components'
import { theme } from 'config'

export const Container = styled.li`
  border-radius: 0.5rem;
  width: 4.2rem;
  height: 4.2rem;
  transition: 300ms;
  cursor: pointer;
  display: grid;
  place-items: center;

  &:hover {
    background: ${theme.colors.white};
  }

  svg {
    color: ${theme.colors.neutral[500]};
  }
`
