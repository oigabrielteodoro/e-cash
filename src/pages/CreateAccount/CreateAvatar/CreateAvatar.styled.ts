import styled from 'styled-components'
import { Wrapper as UploadAvatarWrapper } from 'ui/UploadAvatar/UploadAvatar.styled'

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 5rem;

  ${UploadAvatarWrapper} {
    margin-top: 1.6rem;
    margin-bottom: 5rem;
  }
`
