import styled, { css } from 'styled-components'
import { theme } from 'config'

type ContainerProps = {
  isOpen: boolean
}

export const Container = styled.div<ContainerProps>`
  margin-left: ${theme.grid.sideBar.closed};
  transition: 500ms;
  padding: 2.4rem;

  ${({ isOpen }) =>
    isOpen &&
    css`
      margin-left: ${theme.grid.sideBar.open};
    `}
`

export const Content = styled.main``

export const Title = styled.h1`
  font-weight: 600;
  font-size: ${theme.font.sizes.subtitle};
  color: ${theme.colors.neutral[700]};
`
