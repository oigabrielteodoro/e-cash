import styled, { css, keyframes } from 'styled-components'
import { darken, lighten } from 'polished'

import { theme } from 'config'

import { ShimmerEffectProps } from '.'

type Props = Required<Pick<ShimmerEffectProps, 'size' | 'variant'>>

const modifiers = {
  sm: css`
    width: 25%;
  `,
  md: css`
    width: 50%;
  `,
  lg: css`
    width: 100%;
  `,
}

const variants = {
  image: css`
    width: 5.2rem;
    height: 5.2rem;
    border-radius: 50%;
  `,
  text: css`
    border-radius: 0.5rem;
  `,
}

const progress = keyframes`
  from {
      background-position: -30rem 0;
  }
  to {
      background-position: calc(30rem + 100%) 0;
  }
`

export const Container = styled.span<Props>`
  animation: ${progress} 1.2s ease-in-out infinite;
  background-image: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0),
    ${lighten(1, '#fff')},
    rgba(0, 0, 0, 0)
  );
  background-color: ${darken(0.3, theme.colors.white)};
  background-size: 20rem 100%;
  background-repeat: no-repeat;
  min-width: 3.2rem;
  height: 1.6rem;
  opacity: 0.1;

  & + span {
    margin-top: 0.8rem;
  }

  ${({ size }) => modifiers[size]}
  ${({ variant }) => variants[variant]}
`
