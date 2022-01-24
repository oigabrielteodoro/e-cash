import styled from 'styled-components'

import { theme } from 'config'

export const Container = styled.div`
  border-radius: 1rem;
  background: ${theme.colors.blue[500]};
  height: 5.5rem;
  width: 5.5rem;
  display: grid;
  place-items: center;
`
