import { theme } from 'config'
import styled, { css } from 'styled-components'

import { InputProps } from 'ui'

type WrapperProps = {
  isRequired: boolean
}

type Props = {
  isFilled: boolean
  isFocused: boolean
  isErrored: boolean
  isDisabled: boolean
} & Required<Pick<InputProps, 'variant'>>

const modifiers = {
  primary: css`
    background: ${theme.colors.white};
  `,
  secondary: css`
    background: ${theme.colors.neutral[300]};
  `,
}

export const Wrapper = styled.fieldset<WrapperProps>`
  border: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;

  label {
    font-size: ${theme.font.sizes.paragraph};
    color: ${theme.colors.neutral[500]};
    font-weight: 500;
    cursor: pointer;

    ${({ isRequired }) =>
      isRequired &&
      css`
        &::before {
          content: '•';
          font-size: 1.8rem;
          margin-right: 0.8rem;
          color: ${theme.colors.blue[500]};
        }
      `}
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

  > svg, .icon {
    margin-left: auto;
    margin-right: 2rem;
    color: ${theme.colors.neutral[500]};
    transition: 300ms;
  }

  &:hover {
    border: 0.1rem solid ${theme.colors.blue[500]};

    > svg,
    .icon {
      color: ${theme.colors.blue[500]};
    }
  }

  ${({ isFilled, isDisabled }) =>
    isFilled &&
    !isDisabled &&
    css`
      > svg {
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

        > svg,
        .icon {
          color: ${theme.colors.blue[500]};
        }
      }

      > svg,
      .icon {
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

          > svg,
          .icon {
            color: ${theme.colors.red[400]};
          }
        }
      `}

      > svg, .icon {
        color: ${theme.colors.red[400]};
      }
    `};

  ${({ isDisabled }) =>
    isDisabled &&
    css`
      background: ${theme.colors.neutral[200]};
      cursor: no-drop;

      input {
        cursor: no-drop;
      }

      &:hover {
        border: 0.1rem solid ${theme.colors.neutral[500]};

        > svg,
        .icon {
          color: ${theme.colors.neutral[500]};
        }
      }
    `}

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
