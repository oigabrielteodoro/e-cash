import styled, { css } from 'styled-components'

import { theme } from 'config'
import type { TooltipProps } from '.'

type Props = Required<Pick<TooltipProps, 'position'>>

const modifiers = {
  top: css`
    top: 0;
    left: 50%;
    transform: translate(-50%, calc(-100% - 0.7rem));
    &::before {
      bottom: -0.5rem;
      left: 50%;
      transform: translateX(-50%);
      border-bottom-width: 0;
      border-top-color: ${theme.colors.white};
    }
  `,
  bottom: css`
    left: 50%;
    bottom: 0;
    transform: translate(-50%, calc(100% + 0.7rem));
    &::before {
      top: -0.5rem;
      left: 50%;
      transform: translateX(-50%);
      border-top-width: 0;
      border-bottom-color: ${theme.colors.white};
    }
  `,
  right: css`
    top: 50%;
    right: 0;
    transform: translate(calc(100% + 0.7rem), -50%);
    &::before {
      top: 50%;
      left: -0.5rem;
      border-left-width: 0;
      transform: translateY(-50%);
      border-right-color: ${theme.colors.white};
    }
  `,
  left: css`
    top: 50%;
    left: 0;
    transform: translate(calc(-100% - 0.7rem), -50%);
    &::before {
      right: -0.5rem;
      top: 50%;
      transform: translateY(-50%);
      border-right-width: 0;
      border-left-color: ${theme.colors.white};
    }
  `,
}

export const Container = styled.span<Props>`
  position: absolute;
  color: ${theme.colors.neutral[900]};
  font-size: ${theme.font.sizes.disclaimer};
  font-weight: 500;
  background: ${theme.colors.white};
  box-shadow: 0 0 5rem rgba(0, 0, 0, 0.1);
  padding: 1rem 1.6rem;
  opacity: 0;
  visibility: hidden;
  border-radius: 0.5rem;
  white-space: nowrap;
  transition: opacity 300ms, visibility 300ms;
  text-align: center;
  z-index: 1;
  &::before {
    content: '';
    position: absolute;
    border-style: solid;
    border-width: 0.6rem;
    border-color: transparent;
  }
  ${({ position }) => modifiers[position]}
`

export const BaseElement = styled.div`
  position: relative;

  &:hover ${Container} {
    opacity: 1;
    visibility: visible;
  }
`
