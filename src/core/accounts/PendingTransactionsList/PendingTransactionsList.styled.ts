import styled from 'styled-components'
import { theme } from 'config'

export const Title = styled.h4`
  display: flex;
  align-items: center;
`

export const AmountText = styled.small`
  margin-left: 1rem;
  font-weight: 400;
  color: ${theme.colors.neutral[500]};
  font-size: ${theme.font.sizes.disclaimer};
  cursor: default;
`

export const List = styled.ul`
  margin: 2.4rem 0;

  li {
    display: flex;
    align-items: center;

    & + li {
      margin-top: 1.6rem;
    }
  }
`

export const TransactionIcon = styled.div`
  height: 4rem;
  width: 4rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${theme.colors.neutral[100]};
  border-color: ${theme.colors.neutral[300]};

  svg {
    color: ${theme.colors.neutral[500]};
  }
`

export const TransactionInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1.6rem;

  strong {
    font-weight: 500;
    font-size: ${theme.font.sizes.small};
    color: ${theme.colors.neutral[600]};
  }

  small {
    color: ${theme.colors.neutral[500]};
    margin-top: 0.4rem;
  }
`
