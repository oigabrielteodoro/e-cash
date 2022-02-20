import styled, { css } from 'styled-components'
import { AvatarProps } from 'ui'

type Props = Pick<AvatarProps, 'src' | 'zoom' | 'rotate'>

export const Element = styled.img<Props>`
  width: 4rem;
  height: 4rem;
  border-radius: 0.5rem;
  object-fit: cover;

  ${({ rotate }) => css`
    transform: rotate(${rotate}deg);
  `}
`
