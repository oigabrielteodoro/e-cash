import styled, { css } from 'styled-components'
import { Container } from 'ui/Button/Button.styled'

type Props = {
  isOpen: boolean
}
export const CreateButtonContainer = styled(Container).attrs<Props>({
  as: 'div',
})<Props>`
  justify-content: flex-start;
  padding-left: 1rem;
  margin-left: 0.4rem;

  ${({ isOpen }) =>
    !isOpen &&
    css`
      padding: 0;
      width: 4.2rem;
      padding-left: 0.9rem;
    `}
`
