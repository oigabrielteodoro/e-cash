import styled, { css } from 'styled-components'
import { theme } from 'config'

type Props = {
  color: string
}

type LevelItemProps = {
  color: string
  active: boolean
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  ul {
    display: flex;
    align-items: center;
    margin-top: 0.8rem;
  }
`

export const TextContainer = styled.div<Props>`
  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    color: ${theme.colors.neutral[500]};
    font-size: ${theme.font.sizes.small};
  }

  span:last-child {
    font-weight: 500;
    color: ${({ color }) => color};
  }
`

export const LevelItem = styled.li<LevelItemProps>`
  height: 0.4rem;
  flex: 1 0;
  background: ${theme.colors.neutral[300]};
  border-radius: 0.3rem;

  & + li {
    margin-left: 0.8rem;
  }

  ${({ active, color }) =>
    active &&
    css`
      background: ${color};
    `}
`
