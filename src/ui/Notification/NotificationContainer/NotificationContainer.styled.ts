import styled from 'styled-components'
import { theme } from 'config'

export const Container = styled.ul`
  position: absolute;
  z-index: ${theme.layers.alwaysOnTop};
  bottom: 4rem;
  left: 0;
  display: flex;
  flex-direction: column;

  li + li {
    margin-top: 1.6rem;
  }
`
