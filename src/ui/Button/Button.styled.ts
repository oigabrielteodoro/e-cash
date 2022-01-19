import { theme } from 'config'
import styled from 'styled-components'

export const Container = styled.button`
  border: 0;
  background: ${theme.colors.blue[500]};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.white};
  border-radius: 0.5rem;
  padding: 1.8rem 3.2rem;
  width: 100%;
  font-weight: 500;
  font-size: ${theme.font.sizes.paragraph};
  transition: 300ms;

  &:hover {
    filter: brightness(0.9);
    transform: scale(0.99);
    box-shadow: 0 0 0 0.4rem #a4b7ea20;
  }
`
