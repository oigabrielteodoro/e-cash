import styled, { css, keyframes } from 'styled-components'
import { theme } from 'config'

import type { Props as StepProps } from '.'

type Props = {
  isActive?: boolean
} & Required<Pick<StepProps, 'status'>>

const animation = keyframes`
  from {
    right: 100%;
  }

  to {
    right: 1.6rem;
  }
`

export const Wrapper = styled.button`
  width: 100%;
  position: relative;
  background: transparent;
  border: 0;
  display: flex;
  justify-content: flex-start;

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
  }

  &:last-child {
    width: 3rem;

    &::after {
      display: none;
    }
  }
`

export const Container = styled.div<Props>`
  border: 0.1rem solid ${theme.colors.neutral[500]};
  height: 3rem;
  width: 3rem;
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: ${theme.colors.neutral[500]};
  transition: 300ms;

  ${({ isActive }) =>
    isActive &&
    css`
      border-color: transparent;
      background: ${theme.colors.blue[500]};
      color: ${theme.colors.white};
      font-weight: 500;
    `}
`
