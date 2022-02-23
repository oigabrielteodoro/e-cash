import styled, { css, keyframes } from 'styled-components'
import { theme } from 'config'

import type { Props as StepProps } from '.'

type Props = Required<Pick<StepProps, 'status' | 'active' | 'disabled'>>
type WrapperProps = Pick<Props, 'disabled'>

const animation = keyframes`
  from {
    right: 100%;
  }

  to {
    right: 1.6rem;
  }
`

const modifiers = ({ active = false, disabled = false }) => ({
  error: css`
    background: ${theme.colors.red[100]};
    color: ${theme.colors.red[400]};
    border-color: ${theme.colors.red[400]};

    ${active &&
    css`
      background: ${theme.colors.red[400]};
      color: ${theme.colors.white};
    `}
  `,
  success: css`
    background: ${theme.colors.blue[100]};
    color: ${theme.colors.blue[500]};
    border-color: ${theme.colors.blue[500]};

    ${active &&
    css`
      background: ${theme.colors.blue[500]};
      color: ${theme.colors.white};
    `}
  `,
  info: css`
    color: ${theme.colors.neutral[500]};
    border-color: ${theme.colors.neutral[500]};

    ${disabled &&
    css`
      cursor: no-drop;
      color: ${theme.colors.neutral[300]};
      border-color: ${theme.colors.neutral[300]};
    `};

    ${!active &&
    !disabled &&
    css`
      &:hover {
        color: ${theme.colors.neutral[900]};
        border-color: ${theme.colors.neutral[900]};
      }
    `};

    ${active &&
    css`
      font-weight: 500;
      border-color: transparent;
      color: ${theme.colors.white};
      background: ${theme.colors.blue[500]};
    `};
  `,
})

export const Wrapper = styled.button<WrapperProps>`
  width: 100%;
  position: relative;
  background: transparent;
  border: 0;
  display: flex;
  justify-content: flex-start;
  cursor: default;

  &::after {
    content: '';
    position: absolute;
    background: ${theme.colors.neutral[300]};
    height: 0.1rem;
    left: 4.6rem;
    right: 1.6rem;
    top: 50%;
    transform: translateY(-50%);
    animation: ${animation} 2s;

    ${({ disabled }) =>
      disabled &&
      css`
        background: ${theme.colors.neutral[200]};
      `}
  }

  &:last-child {
    width: 3rem;

    &::after {
      display: none;
    }
  }
`

export const Container = styled.div<Props>`
  width: 3rem;
  height: 3rem;
  display: grid;
  cursor: pointer;
  transition: 300ms;
  border-radius: 50%;
  place-items: center;
  border: 0.1rem solid transparent;

  ${({ status, active, disabled }) => modifiers({ active, disabled })[status]};
`
