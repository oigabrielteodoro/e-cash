import styled, { css } from 'styled-components'
import { theme } from 'config'

type ContainerProps = {
  isOpen: boolean
}

export const Container = styled.main<ContainerProps>`
  margin-left: calc(${theme.grid.sideBar.closed} + 2.4rem);
  transition: 500ms;

  ${({ isOpen }) =>
    isOpen &&
    css`
      margin-left: calc(${theme.grid.sideBar.open} + 2.4rem);
    `}
`
