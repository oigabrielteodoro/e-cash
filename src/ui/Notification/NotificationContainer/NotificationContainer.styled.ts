import styled from 'styled-components'
import { theme } from 'config'

export const Container = styled.div`
  position: absolute;
  z-index: ${theme.layers.alwaysOnTop};
  bottom: 4rem;
  left: 0;
`
