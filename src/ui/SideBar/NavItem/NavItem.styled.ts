import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'

import { theme } from 'config'

import { TextWithAnimation } from '../WithAnimation'

type Props = {
  $active: boolean
  $visible: boolean
}

type NavItemIconProps = Pick<Props, '$active'>

export const NavItemIcon = styled.div<NavItemIconProps>`
  transition: 300ms;
  min-width: 4.2rem;
  min-height: 4.2rem;
  display: grid;
  place-items: center;
  border-radius: 0.5rem;
  position: relative;

  svg {
    transition: 300ms;
    color: ${theme.colors.neutral[500]};
  }

  ${({ $active }) =>
    $active &&
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

  ${({ $visible }) =>
    $visible &&
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

export const NavItemText = styled(TextWithAnimation)`
  color: ${theme.colors.neutral[500]};
`
