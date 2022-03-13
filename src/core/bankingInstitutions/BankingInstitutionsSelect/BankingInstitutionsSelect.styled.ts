import styled from 'styled-components'
import { theme } from 'config'

export const BankingInstitutionOption = styled.div`
  display: flex;
  align-items: center;
  font-size: ${theme.font.sizes.small};

  img {
    margin-right: 1rem;
    border-radius: 0.5rem;
    height: 3.2rem;
    width: 3.2rem;
  }
`
