import styled from 'styled-components'
import { AvatarProps } from 'ui'

type Props = Pick<AvatarProps, 'src'>

export const Element = styled.img<Props>`
  width: 4rem;
  height: 4rem;
  border-radius: 0.5rem;
  object-fit: cover;
`
