import styled, { css } from 'styled-components'
import { theme } from 'config'

type ContainerProps = {
  isOpen: boolean
}

type SideBarButtonProps = {
  isOpen: boolean
}

export const Container = styled.aside<ContainerProps>`
  top: 0;
  bottom: 0;
  position: fixed;
  width: ${theme.grid.sideBar.closed};
  transition: 500ms;

  ${({ isOpen }) =>
    isOpen &&
    css`
      width: ${theme.grid.sideBar.open};
    `}
`

export const SideBarButton = styled.button<SideBarButtonProps>`
  position: absolute;
  right: calc(-2.4rem / 2);
  top: 10rem;
  border: 0;
  background: ${theme.colors.white};
  box-shadow: 0.1rem 0.1rem 1rem rgba(0, 0, 0, 0.3);
  height: 2.4rem;
  width: 2.4rem;
  border-radius: 50%;
  display: grid;
  place-items: center;
  transition: 800ms ease-out;
  opacity: 0;

  ${({ isOpen }) =>
    isOpen &&
    css`
      transform: rotate(-180deg);
    `}
`

export const Content = styled.div`
  background: ${theme.colors.neutral[100]};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 2.4rem;
  height: 100%;
  width: 100%;
  position: relative;

  &:hover ${SideBarButton} {
    opacity: 1;
  }

  nav ul {
    display: flex;
    flex-direction: column;
    align-items: center;

    li + li {
      margin-top: 2rem;
    }
  }
`

export const Avatar = styled.img`
  width: 5.2rem;
  height: 5.2rem;
  border-radius: 50%;
`
