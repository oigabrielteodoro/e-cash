import styled, { css } from 'styled-components'

import { theme } from 'config'
import { Card } from 'ui/Card'

import { AccountCardProps } from '.'

type ContainerProps = Pick<AccountCardProps, 'disabled'>

export const AccountFlagImg = styled.img`
  width: 4.5rem;
  height: 4.5rem;
  border-radius: ${theme.radius.card};
  background: ${theme.colors.neutral[200]};
  display: grid;
  place-items: center;
  color: ${theme.colors.neutral[500]};
`

export const Container = styled(Card)<ContainerProps>`
  width: 100%;
  padding: 2.4rem 1.2rem;
  transition: 300ms;
  cursor: pointer;

  &:hover {
    transform: translateY(-1rem);
  }

  ${({ disabled }) =>
    disabled &&
    css`
      border-color: transparent;

      ${AccountFlagImg} {
        filter: grayscale(1);
      }
    `}
`

export const AccountFlagBox = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
`

export const AccountInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1.6rem;
  text-align: left;

  strong {
    width: 25rem;
    font-weight: 600;
    font-size: ${theme.font.sizes.paragraph};
    text-overflow: ellipsis;
  }

  small {
    width: 25rem;
    text-overflow: ellipsis;
    font-size: ${theme.font.sizes.small};
  }
`

export const AccountInfo = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 0.6rem;
  font-size: ${theme.font.sizes.small};
  color: ${theme.colors.neutral[600]};

  span {
    display: flex;
    flex-direction: column;

    &:last-child {
      margin-left: 1.6rem;
    }
  }
`

export const AccountBalanceBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1.6rem;
  width: 100%;

  span {
    color: ${theme.colors.neutral[500]};
    font-size: ${theme.font.sizes.disclaimer};
  }
`

export const AccountBalance = styled.button`
  background: ${theme.colors.neutral[200]};
  border: 0.1rem solid ${theme.colors.neutral[300]};
  border-radius: 0.2rem;
  padding: 0.6rem 1.4rem;
  font-size: ${theme.font.sizes.disclaimer};
  color: ${theme.colors.neutral[600]};
  transition: 300ms;

  &:hover {
    opacity: 0.8;
  }
`

export const Separator = styled.div`
  background: ${theme.colors.neutral[300]};
  height: 3.2rem;
  width: 0.1rem;
  margin: auto 1.6rem;
`
