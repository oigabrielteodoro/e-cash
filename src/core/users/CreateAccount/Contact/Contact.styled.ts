import styled from 'styled-components'

import { Wrapper as InputWrapper } from 'ui/Input/Input.styled'

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 5rem;

  ${InputWrapper} {
    margin-top: 1.6rem;
  }

  button {
    margin-top: 2rem;
  }
`
