import styled from 'styled-components'

import { theme } from 'config'
import { lighten } from 'polished'

export const AccountBalanceBox = styled.div`
  border-radius: ${theme.radius.popover};
  background: ${lighten(0.02, theme.colors.neutral[100])};
  margin-bottom: 4.2rem;
  padding: 2.4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const AccountBalanceAmountBox = styled.div`
  display: flex;
  flex-direction: column;

  span {
    font-weight: 400;
    color: ${theme.colors.neutral[500]};
    font-size: ${theme.font.sizes.small};
  }

  strong {
    font-weight: 600;
    font-size: ${theme.font.sizes.subtitle};
  }
`

export const AccountInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  margin-left: 2.4rem;

  strong {
    font-size: 1.8rem;
    font-weight: 600;
  }

  span {
    font-size: ${theme.font.sizes.small};
  }
`

export const AccountInfoSeparator = styled.div`
  background: ${theme.colors.neutral[300]};
  height: 3.2rem;
  width: 0.1rem;
  margin: auto 3.2rem;
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

export const HorizontalSeparator = styled.div`
  background: ${theme.colors.neutral[300]};
  height: 0.1rem;
  width: 100%;
  margin: 4.2rem 0;
  position: relative;

  &::before {
    content: 'Last transactions';
    position: absolute;
    background: ${theme.colors.white};
    padding-right: 1.6rem;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    font-weight: 500;
    font-size: ${theme.font.sizes.small};
    color: ${theme.colors.neutral[500]};
  }
`
