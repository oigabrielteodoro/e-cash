import styled from 'styled-components'
import { theme } from 'config'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-bottom: 2.4rem;
`

export const GhostInput = styled.input`
  font-weight: 600;
  font-size: ${theme.font.sizes.title};
  margin: 0 auto 1.2rem;
  max-width: 30rem;
  text-align: center;
  background: transparent;
  border: 0;
`
