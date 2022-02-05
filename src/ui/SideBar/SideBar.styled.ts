import styled, { css } from 'styled-components'
import { theme } from 'config'

import { TextBoldWithAnimation } from './WithAnimation'

type Props = {
  isOpen: boolean
}

export const Container = styled.aside<Props>`
  top: 0;
  bottom: 0;
  position: fixed;
  width: ${theme.grid.sideBar.closed};
  transition: 500ms;
  z-index: 1;

  ${({ isOpen }) =>
    isOpen &&
    css`
      width: ${theme.grid.sideBar.open};
    `}
`

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`

export const LogoTitle = styled(TextBoldWithAnimation).attrs({
  transition: {
    duration: 0.2,
  },
})`
  font-size: ${theme.font.sizes.subtitle};
  white-space: nowrap;
`

export const SideBarButton = styled.button<Props>`
  position: absolute;
  right: calc(-2.4rem / 2);
  top: 10rem;
  border: 0;
  background: ${theme.colors.white};
  border: 0.3rem solid ${theme.colors.neutral[100]};
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

export const NewButtonContainer = styled.div<Props>`
  button {
    justify-content: flex-start;
    padding-left: 1rem;

    ${({ isOpen }) =>
      !isOpen &&
      css`
        padding: 0;
        width: 4.2rem;
        padding-left: 0.9rem;
      `}
  }
`

export const Content = styled.div<Props>`
  background: ${theme.colors.neutral[100]};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  padding: 2.4rem;
  height: 100%;
  width: 100%;
  position: relative;

  &:hover ${SideBarButton} {
    opacity: 1;
  }

  nav {
    width: 100%;

    ul {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-left: 0.5rem;
      transition: 300ms;

      li {
        width: 100%;

        & + li {
          margin-top: 2rem;
        }
      }
    }
  }
`
