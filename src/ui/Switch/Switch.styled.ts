import { theme } from 'config'
import styled, { css } from 'styled-components'

type Props = {
  checked: boolean
}

const bulletSize = '1.8rem'
const bulletSpace = '0.4rem'

export const Wrapper = styled.div`
  display: flex;
  align-items: center;

  label {
    cursor: pointer;
    color: ${theme.colors.neutral[600]};
  }
`

export const Container = styled.button<Props>`
  background: ${theme.colors.blue[100]};
  height: 2.6rem;
  width: 4.2rem;
  border-radius: 2.6rem;
  border: 0;
  position: relative;
  display: flex;
  align-items: center;
  transition: 300ms;
  margin-right: 1.6rem;

  ${({ checked }) =>
    checked &&
    css`
      background: ${theme.colors.blue[500]};
    `}

  &::before {
    content: '';
    position: absolute;
    background: ${theme.colors.white};
    height: ${bulletSize};
    width: ${bulletSize};
    border-radius: 100%;
    transition: 300ms;
    left: ${bulletSpace};

    ${({ checked }) =>
      checked &&
      css`
        left: calc(100% - ${bulletSize} - ${bulletSpace});
      `}
  }
`
