import styled from 'styled-components'
import { darken } from 'polished'
import { theme } from 'config'

export const Container = styled.div`
  max-width: 30rem;
  text-align: center;
  align-self: center;

  h1 {
    font-weight: 600;
  }

  p {
    margin: 1rem 0;
    color: ${theme.colors.neutral[500]};
  }

  button {
    border: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    border-radius: ${theme.radius.popover};
    transition: 300ms;

    svg {
      margin-bottom: 1rem;
    }

    &.cancel {
      color: ${theme.colors.neutral[500]};
      background: ${theme.colors.neutral[100]};

      &:hover {
        background: ${theme.colors.neutral[200]};
      }
    }

    &.confirm {
      color: ${theme.colors.white};
      background: ${theme.colors.red[400]};

      &:disabled {
        opacity: 0.5;
        cursor: no-drop;
      }

      &:hover {
        background: ${darken(0.05, theme.colors.red[400])};
      }
    }
  }
`
