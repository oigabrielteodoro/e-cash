import styled from 'styled-components'
import { theme } from 'config'

import { ContainerWithAnimation } from '../WithAnimation'

export const Container = styled.section`
  display: flex;
  align-items: center;
`

export const Content = styled(ContainerWithAnimation)`
  display: flex;
  flex-direction: column;
`

export const Title = styled.strong`
  color: ${theme.colors.neutral[900]};
  white-space: nowrap;
  font-weight: 600;
`

export const Email = styled.span`
  font-size: ${theme.font.sizes.disclaimer};
  color: ${theme.colors.neutral[500]};
  white-space: nowrap;
  margin-top: 0.4rem;
`
