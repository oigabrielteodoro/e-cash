import { theme } from 'config'
import styled from 'styled-components'

import type { EmptyStateProps } from '.'

type Props = Required<Pick<EmptyStateProps, 'size'>>

const sizes = {
  sm: {
    title: theme.font.sizes.small,
    description: theme.font.sizes.disclaimer,
  },
  md: {
    title: '1.8rem',
    description: theme.font.sizes.small,
  },
  lg: {
    title: theme.font.sizes.subtitle,
    description: theme.font.sizes.small,
  },
}

export const Container = styled.div<Props>`
  display: flex;
  flex-direction: column;
  align-items: center;

  > strong {
    font-weight: 600;
    font-size: ${({ size }) => sizes[size].title};
  }

  > p {
    margin-top: 0.8rem;
    color: ${theme.colors.neutral[500]};
    font-size: ${({ size }) => sizes[size].description};
  }
`

export const Content = styled.div`
  margin-top: 2.4rem;
`
