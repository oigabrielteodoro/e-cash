import styled from 'styled-components'
import { theme } from 'config'

export const Container = styled.div`
  padding: 1.6rem;
  border-radius: ${theme.radius.card};
  background: ${theme.colors.blue[100]};
  border: 0.1rem solid ${theme.colors.blue[500]};
  display: flex;
  align-items: center;
  font-weight: 500;
`

export const IconContainer = styled.div`
  background: ${theme.colors.blue[500]};
  height: 4.2rem;
  min-width: 4.2rem;
  border-radius: 0.5rem;
  margin-right: 1.6rem;
  display: grid;
  place-items: center;
  color: ${theme.colors.white};
`
