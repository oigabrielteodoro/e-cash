import styled, { css } from 'styled-components'

import { theme } from 'config'

import { ContainerWithAnimation } from '../WithAnimation'

type ContainerProps = {
  isOpen: boolean
}

export const Wrapper = styled.div`
  width: 100%;
`

export const Container = styled.button<ContainerProps>`
  width: 100%;
  display: flex;
  align-items: center;
  background: transparent;
  border: 0;
  border-radius: 0.5rem;
  transition: 300ms;
  height: 7.6rem;

  ${({ isOpen }) =>
    isOpen &&
    css`
      padding: 0 1rem;

      &:hover {
        background: ${theme.colors.white};
      }
    `}
`

export const Content = styled(ContainerWithAnimation)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: absolute;
  left: calc(4rem + 1.6rem);
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
