import styled from 'styled-components'

import { theme } from 'config'

export const AccountBankCard = styled.div`
  width: 100%;
  padding: 2.4rem 0.8rem;
  border-radius: ${theme.radius.card};
  box-shadow: ${theme.dropShadow.popover};
  border: 0.1rem solid ${theme.colors.neutral[300]};
  transition: 300ms;

  &:hover {
    transform: translateY(-1rem);
  }
`

export const AccountBankFlagBox = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
`

export const AccountBankInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1.6rem;

  h3 {
    font-size: 16px;
  }

  small {
    margin-top: 0.4rem;
    font-size: 12px;
  }
`

export const AccountBankInfo = styled.div`
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

export const AccountBankBalanceBox = styled.div`
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

export const AccountBankBalance = styled.button`
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

export const AccountBankFlagImg = styled.img`
  width: 4.5rem;
  height: 4.5rem;
  border-radius: ${theme.radius.card};
`

export const Separator = styled.div`
  background: ${theme.colors.neutral[300]};
  height: 3.2rem;
  width: 0.1rem;
  margin: auto 1.6rem;
`
