import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'

import { theme } from 'config'
import { motion } from 'framer-motion'

type Props = {
  isOpen: boolean
  isActive: boolean
}

type NavItemIconProps = Pick<Props, 'isActive'>

export const NavItemIcon = styled.div<NavItemIconProps>`
  transition: 300ms;
  width: 4.2rem;
  height: 4.2rem;
  display: grid;
  place-items: center;
  border-radius: 0.5rem;
  z-index: 1;
  position: relative;

  svg {
    transition: 300ms;
    color: ${theme.colors.neutral[500]};
  }

  ${({ isActive }) =>
    isActive &&
    css`
      background: ${theme.colors.white};

      svg {
        color: ${theme.colors.blue[500]};
      }
    `}
`

export const Container = styled(Link)<Props>`
  transition: 300ms;
  cursor: pointer;
  display: flex;
  align-items: center;
  text-decoration: none;
  position: relative;

  ${({ isOpen }) =>
    isOpen &&
    css`
      width: 100%;
    `}

  &:hover ${NavItemIcon} {
    background: ${theme.colors.white};

    svg {
      color: ${theme.colors.blue[500]};
    }
  }
`

export const NavItemText = styled(motion.span).attrs({
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
})`
  color: ${theme.colors.neutral[500]};
`
