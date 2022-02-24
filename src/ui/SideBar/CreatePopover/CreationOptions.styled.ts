import styled from 'styled-components'
import { darken } from 'polished'
import { theme } from 'config'

export const Container = styled.div`
  padding: 2rem;

  button {
    width: 100%;
    height: 12rem;
    background: transparent;
    border-radius: ${theme.radius.card};
    border: 0.1rem solid ${theme.colors.neutral[300]};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: ${theme.colors.neutral[500]};
    transition: 300ms;

    svg {
      margin-bottom: 1rem;
    }

    &:hover {
      background: ${darken(0.01, theme.colors.neutral[100])};
    }
  }
`
