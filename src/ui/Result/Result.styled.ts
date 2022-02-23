import styled from 'styled-components'

import { theme } from 'config'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  h1 {
    font-size: ${theme.font.sizes.title};
  }

  p {
    margin: 2rem 0 3.2rem;
    font-size: ${theme.font.sizes.paragraph};
  }
`
