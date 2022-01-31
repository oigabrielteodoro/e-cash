import { theme } from 'config'
import styled from 'styled-components'

export const Container = styled.ul`
  padding: 0.8rem;
  min-width: 100%;

  button {
    border: 0;
    width: 100%;
    background: transparent;
    height: 5rem;
    border-radius: 0.5rem;
    transition: 300ms;
    text-align: left;
    padding-left: 1.4rem;
    color: ${theme.colors.neutral[500]};
    display: flex;
    align-items: center;

    svg {
      margin-right: 1.6rem;
    }

    &:hover {
      background: ${theme.colors.neutral[100]};
    }
  }

  li:last-child {
    button:hover {
      color: ${theme.colors.white};
      background: ${theme.colors.red[500]};
    }
  }
`
