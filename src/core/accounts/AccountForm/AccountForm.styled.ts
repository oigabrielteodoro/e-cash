import { theme } from 'config'
import styled from 'styled-components'

export const BankOption = styled.div`
  display: flex;
  align-items: center;
  font-size: ${theme.font.sizes.disclaimer};

  img {
    margin-right: 1.6rem;
    border-radius: 0.5rem;
    height: 3.2rem;
    width: 3.2rem;
  }
`
