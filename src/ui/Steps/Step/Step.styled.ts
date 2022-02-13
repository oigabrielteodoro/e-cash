import styled, { css, keyframes } from 'styled-components'
import { theme } from 'config'

import type { Props as StepProps } from '.'

type Props = Required<Pick<StepProps, 'status' | 'isActive' | 'isDisabled'>>
type WrapperProps = Pick<Props, 'isDisabled'>

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
    background: ${theme.colors.neutral[200]};
    height: 0.1rem;
    left: 4.6rem;
    right: 1.6rem;
    top: 50%;
    transform: translateY(-50%);
    animation: ${animation} 2s;

    ${({ isDisabled }) =>
      isDisabled &&
      css`
        background: ${theme.colors.neutral[100]};
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

  ${({ isDisabled }) =>
    isDisabled &&
    css`
      cursor: no-drop;
      color: ${theme.colors.neutral[100]};
      border-color: ${theme.colors.neutral[100]};
    `}

  ${({ isActive }) =>
    isActive &&
    css`
      font-weight: 500;
      border-color: transparent;
      color: ${theme.colors.white};
      background: ${theme.colors.blue[500]};
    `}
`
