import styled, { css, keyframes } from 'styled-components'
import { AiOutlineSync } from 'react-icons/ai'

import { theme } from 'config'

type Props = {
  isFocused: boolean
}

const loading = keyframes`
  0% {
    transform: rotate(0)
  }

  100% {
    transform: rotate(360deg)
  }
`

export const Container = styled.div<Props>`
  background: ${theme.colors.white};
  margin-left: 2.4rem;
  height: 4rem;
  display: flex;
  border-radius: 0.5rem;
  transition: 300ms;
  box-shadow: 0 0 10rem 1rem rgba(0, 0, 0, 0.1);

  input {
    height: 4rem;
    padding: 0 1.6rem;
    background: transparent;
    border: 0;
    color: ${theme.colors.neutral[500]};
    border: 0.1rem solid ${theme.colors.neutral[200]};
    border-radius: 0.5rem 0 0 0.5rem;
    transition: 300ms;

    ${({ isFocused }) =>
      isFocused &&
      css`
        border-color: ${theme.colors.neutral[500]};
      `}

    &:hover {
      border-color: ${theme.colors.neutral[500]};
    }

    &::placeholder {
      color: ${theme.colors.neutral[500]};
    }
  }

  button {
    width: 4rem;
    height: 100%;
    background: transparent;
    border: 0.1rem solid ${theme.colors.neutral[200]};
    border-left-color: transparent;
    border-radius: 0 0.5rem 0.5rem 0;
    display: grid;
    place-items: center;
    transition: 300ms;
    transform: translateX(-0.1rem);

    &:disabled {
      opacity: 0.4;
      cursor: no-drop;
    }

    svg {
      color: ${theme.colors.neutral[500]};
      transition: 300ms;
    }

    &:hover {
      border-color: ${theme.colors.neutral[500]};

      svg {
        border-color: ${theme.colors.neutral[500]};
      }
    }
  }
`

export const LoadIcon = styled(AiOutlineSync).attrs({
  size: 18,
  'aria-label': 'loading',
})`
  animation: ${loading} 1.2s ease-in-out infinite;
`
