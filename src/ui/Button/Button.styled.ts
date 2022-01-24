import styled, { keyframes, css } from 'styled-components'
import { AiOutlineSync } from 'react-icons/ai'

import { theme } from 'config'

import { ButtonProps } from '.'

type ContainerProps = Required<Pick<ButtonProps, 'size' | 'variant'>>

const loading = keyframes`
  0% {
    transform: rotate(0)
  }

  100% {
    transform: rotate(360deg)
  }
`

const modifiers = {
  sm: css`
    padding: 0.8rem 1.6rem;
  `,
  md: css`
    padding: 1.2rem 2.4rem;
  `,
  lg: css`
    padding: 1.8rem 3.2rem;
  `,
}

const variants = {
  primary: css`
    background: ${theme.colors.blue[500]};
  `,
  secondary: css``,
  outline: css``,
  icon: css`
    width: 4.2rem;
    height: 4.2rem;
    background: ${theme.colors.blue[500]};
    padding: 0;
  `,
}

export const Container = styled.button<ContainerProps>`
  border: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.white};
  border-radius: 0.5rem;
  width: 100%;
  font-weight: 500;
  font-size: ${theme.font.sizes.paragraph};
  transition: 300ms;

  ${({ size }) => modifiers[size]}
  ${({ variant }) => variants[variant]}

  &:disabled {
    opacity: 0.8;
  }

  &:hover {
    filter: brightness(0.9);
    transform: scale(0.99);
    box-shadow: 0 0 0 0.4rem ${theme.shadow.blue[300]};
  }
`

export const LoadIcon = styled(AiOutlineSync).attrs({
  size: 18,
  'aria-label': 'loading',
})`
  animation: ${loading} 1.2s ease-in-out infinite;
`
