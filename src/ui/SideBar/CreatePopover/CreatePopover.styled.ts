import styled, { css } from 'styled-components'
import { Container } from 'ui/Button/Button.styled'

type Props = {
  isOpen: boolean
}
export const CreateButtonContainer = styled(Container).attrs<Props>({
  as: 'div',
})<Props>`
  padding-left: 1.6rem;
  height: 4.2rem;
  margin-left: 0.4rem;
  justify-content: flex-start;

  ${({ isOpen }) =>
    !isOpen &&
    css`
      padding: 0;
      width: 4.2rem;
      justify-content: center;
    `}
`
