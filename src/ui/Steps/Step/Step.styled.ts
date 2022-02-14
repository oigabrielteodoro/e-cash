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
  color: ${theme.colors.neutral[500]};
  border: 0.1rem solid ${theme.colors.neutral[500]};

  ${({ active, disabled }) =>
    !active &&
    !disabled &&
    css`
      &:hover {
        color: ${theme.colors.neutral[900]};
        border-color: ${theme.colors.neutral[900]};
      }
    `}

  ${({ disabled }) =>
    disabled &&
    css`
      cursor: no-drop;
      color: ${theme.colors.neutral[300]};
      border-color: ${theme.colors.neutral[300]};
    `}

  ${({ active }) =>
    active &&
    css`
      font-weight: 500;
      border-color: transparent;
      color: ${theme.colors.white};
      background: ${theme.colors.blue[500]};
    `}
`
