import { theme } from 'config'
import styled, { css } from 'styled-components'

import { InputProps } from 'ui'

type Props = {
  isFilled: boolean
  isFocused: boolean
  isErrored: boolean
} & Required<Pick<InputProps, 'variant'>>

const modifiers = {
  primary: css`
    background: ${theme.colors.white};
  `,
  secondary: css`
    background: ${theme.colors.neutral[300]};
  `,
}

export const Wrapper = styled.fieldset`
  border: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;

  label {
    position: absolute;
    font-size: ${theme.font.sizes.small};
    left: 1.2rem;
    top: -0.1rem;
    background: ${theme.colors.white};
    padding: 0 0.8rem;
    color: ${theme.colors.neutral[500]};
    font-weight: 500;
    cursor: pointer;
  }
`

export const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.8rem;

  svg {
    color: ${theme.colors.red[400]};
    margin-right: 0.8rem;
  }

  span {
    color: ${theme.colors.red[400]};
  }
`

export const Container = styled.div<Props>`
  display: flex;
  align-items: center;
  border: 0.1rem solid ${theme.colors.neutral[500]};
  border-radius: 0.5rem;
  margin-top: 0.8rem;
  transition: 300ms;
  width: 100%;

  ${({ variant }) => modifiers[variant]}

  svg {
    margin-left: auto;
    margin-right: 2rem;
    color: ${theme.colors.neutral[500]};
    transition: 300ms;
  }

  &:hover {
    border: 0.1rem solid ${theme.colors.blue[500]};

    svg {
      color: ${theme.colors.blue[500]};
    }
  }

  ${({ isFilled }) =>
    isFilled &&
    css`
      svg {
        color: ${theme.colors.blue[500]};
      }
    `};

  ${({ isFocused }) =>
    isFocused &&
    css`
      border: 0.1rem solid ${theme.colors.blue[500]};
      box-shadow: 0 0 0 0.4rem ${theme.shadow.blue[300]};

      &:hover {
        border: 0.1rem solid ${theme.colors.blue[500]};

        svg {
          color: ${theme.colors.blue[500]};
        }
      }

      svg {
        color: ${theme.colors.blue[300]};
      }
    `};

  ${({ isErrored, isFocused }) =>
    isErrored &&
    css`
      border: 0.1rem solid ${theme.colors.red[400]};

      ${isFocused &&
      css`
        box-shadow: 0 0 0 0.4rem ${theme.shadow.red[400]};

        &:hover {
          border: 0.1rem solid ${theme.colors.red[400]};

          svg {
            color: ${theme.colors.red[400]};
          }
        }
      `}

      svg {
        color: ${theme.colors.red[400]};
      }
    `};

  input,
  textarea {
    flex: 1;
    border: 0;
    background: transparent;
    padding: 1.8rem 2rem;
    color: ${theme.colors.neutral[900]};
    font-size: ${theme.font.sizes.paragraph};
    border-radius: 0.5rem;

    &::placeholder {
      color: ${theme.colors.neutral[500]};
    }
  }

  textarea {
    resize: none;
    padding: 0 2rem;
    margin: 2.4rem 0;
  }
`
