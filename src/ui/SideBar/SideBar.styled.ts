import styled, { css } from 'styled-components'
import { theme } from 'config'

type ContainerProps = {
  isOpen: boolean
}

export const Container = styled.aside<ContainerProps>`
  top: 0;
  bottom: 0;
  position: fixed;
  background: ${theme.colors.neutral[100]};
  width: ${theme.grid.sideBar.closed};
  transition: 500ms;

  ${({ isOpen }) =>
    isOpen &&
    css`
      width: ${theme.grid.sideBar.open};
    `}
`
