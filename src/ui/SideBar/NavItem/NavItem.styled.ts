import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'

import { theme } from 'config'

import { WithTextAnimation } from '../WithAnimation'

type Props = {
  isOpen: boolean
  isActive: boolean
}

type NavItemIconProps = Pick<Props, 'isActive'>

export const NavItemIcon = styled.div<NavItemIconProps>`
  transition: 300ms;
  min-width: 4.2rem;
  min-height: 4.2rem;
  display: grid;
  place-items: center;
  border-radius: 0.5rem;
  position: relative;
  z-index: 1;

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

export const NavItemText = styled(WithTextAnimation)`
  color: ${theme.colors.neutral[500]};
`
