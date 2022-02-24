import { theme } from 'config'

import styled, { keyframes } from 'styled-components'

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`

export const Container = styled.div`
  display: flex;
  align-items: center;

  input {
    background: ${theme.colors.white};
    border: 0.1rem solid ${theme.colors.neutral[500]};
    border-radius: 0.5rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    appearance: none;
    width: 1.8rem;
    height: 1.8rem;
    transition: 300ms;

    &::before {
      content: '';
      width: 100%;
      height: 100%;
      opacity: 0;
      animation: ${fadeIn} 300ms;
      border-radius: 0.5rem;
      background: url('data:image/svg+xml; utf8, <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 0H2C0.9 0 0 0.9 0 2V16C0 17.1 0.9 18 2 18H16C17.1 18 18 17.1 18 16V2C18 0.9 17.1 0 16 0ZM7.71 13.29C7.32 13.68 6.69 13.68 6.3 13.29L2.71 9.7C2.32 9.31 2.32 8.68 2.71 8.29C3.1 7.9 3.73 7.9 4.12 8.29L7 11.17L13.88 4.29C14.27 3.9 14.9 3.9 15.29 4.29C15.68 4.68 15.68 5.31 15.29 5.7L7.71 13.29Z" fill="white"/></svg>')
        no-repeat;
    }

    &:read-only {
      pointer-events: none;
    }

    &:focus {
      box-shadow: 0 0 0 0.2rem ${theme.colors.neutral[300]};
      border: 0.1rem solid ${theme.colors.neutral[300]};
    }

    &:checked {
      background: ${theme.colors.neutral[500]};

      &::before {
        opacity: 1;
      }
    }
  }

  label {
    margin-left: 0.8rem;
    color: ${theme.colors.neutral[500]};
  }
`
