import styled, { css } from 'styled-components'

import { theme } from 'config'

type Props = {
  disabled?: boolean
}

export const Flag = styled.img<Props>`
  width: 4.5rem;
  height: 4.5rem;
  border-radius: ${theme.radius.card};
  background: ${theme.colors.neutral[200]};
  display: grid;
  place-items: center;
  color: ${theme.colors.neutral[500]};

  ${({ disabled }) =>
    disabled &&
    css`
      filter: grayscale(1);
    `}
`
