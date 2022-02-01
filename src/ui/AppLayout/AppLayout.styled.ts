import styled, { css } from 'styled-components'
import { theme } from 'config'

type ContainerProps = {
  isOpen: boolean
}

export const Container = styled.div<ContainerProps>`
  margin-left: ${theme.grid.sideBar.closed};
  transition: 500ms;
  padding: 4rem;
  ${({ isOpen }) =>
    isOpen &&
    css`
      margin-left: ${theme.grid.sideBar.open};
    `}
`

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4rem;
`

export const Content = styled.main``

export const Title = styled.h1`
  font-weight: 500;
  color: ${theme.colors.neutral[700]};
`
