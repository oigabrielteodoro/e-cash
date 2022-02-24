import styled, { css } from 'styled-components'
import { theme } from 'config'

type CardStatusProps = {
  status: 'up' | 'down'
}

const modifiers = {
  up: css`
    color: ${theme.colors.green[500]};
  `,
  down: css`
    color: ${theme.colors.red[500]};

    svg {
      transform: rotate(-180deg);
    }
  `,
}

export const Card = styled.button`
  padding: 2.4rem;
  position: relative;
  background: ${theme.colors.white};
  border-radius: ${theme.radius.card};
  box-shadow: ${theme.dropShadow.popover};
  width: 100%;
  display: flex;
  align-items: flex-start;
  border: 0;
  transition: 300ms;
  border: 0.1rem solid ${theme.colors.neutral[300]};
  transition: 300ms;

  &:hover {
    transform: translateY(-1rem);
  }

  &:active {
    transform: scale(0.98);
  }
`

export const CardIcon = styled.div`
  width: 4.5rem;
  height: 4.5rem;
  display: grid;
  place-items: center;
  border-radius: ${theme.radius.card};
  background: ${theme.colors.blue[500]};
  margin-left: auto;

  svg {
    color: ${theme.colors.white};
  }
`

export const CardStatus = styled.div<CardStatusProps>`
  display: flex;
  align-items: center;
  margin-top: 1rem;

  ${({ status }) => modifiers[status]};

  small {
    white-space: nowrap;
    font-size: ${theme.font.sizes.small};
    font-weight: 500;
  }

  svg {
    margin-right: 0.4rem;
  }
`

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-right: 2.4rem;
  flex: 1;

  span {
    font-weight: 500;
    color: ${theme.colors.neutral[500]};
  }

  strong {
    font-weight: 600;
    margin-top: 0.6rem;
    font-size: ${theme.font.sizes.subtitle};
  }
`
