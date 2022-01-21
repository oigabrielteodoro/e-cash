import styled, { keyframes } from 'styled-components'
import { theme } from 'config'

const loading = keyframes`
  0% {
    transform: rotate(0)
  }

  100% {
    transform: rotate(360deg)
  }
`

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

  &:disabled {
    opacity: 0.8;
  }

  svg {
    animation: ${loading} 1.2s ease-in-out infinite;
  }

  &:hover {
    filter: brightness(0.9);
    transform: scale(0.99);
    box-shadow: 0 0 0 0.4rem ${theme.shadow.blue[300]};
  }
`
