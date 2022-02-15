import styled from 'styled-components'

import { Wrapper as InputWrapper } from 'ui/Input/Input.styled'
import { Container as PasswordStrengthContainer } from 'ui/PasswordInput/PasswordStrength/PasswordStrength.styled'

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 5rem;

  ${InputWrapper} {
    margin-top: 1.6rem;

    &:last-child {
      margin-top: 2.6rem;
    }
  }

  ${PasswordStrengthContainer} {
    margin-top: 1rem;
  }

  > button {
    margin-top: 2rem;
  }
`
