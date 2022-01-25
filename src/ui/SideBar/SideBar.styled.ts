import styled, { css } from 'styled-components'
import { theme } from 'config'
import { motion } from 'framer-motion'

type Props = {
  isOpen: boolean
}

export const Container = styled.aside<Props>`
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

export const SideBarButton = styled.button<Props>`
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

export const NewButtonText = styled(motion.span).attrs({
  initial: 'hidden',
  animate: 'visible',
  exit: 'hidden',
  variants: {
    hidden: {
      opacity: 0,
      translateX: '-1.6rem',
      transition: {
        duration: 0.3,
      },
    },
    visible: {
      opacity: 1,
      translateX: '1.6rem',
      transition: {
        duration: 0.3,
      },
    },
  },
})``

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
