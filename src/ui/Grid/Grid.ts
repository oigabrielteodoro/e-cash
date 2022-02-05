import styled, { css } from 'styled-components'
import { percentFromInt } from 'lib'

type RowProps = {
  variant?: ''
  gutter: [number, number]
}

type ColProps = {
  span: number
}

export const Col = styled.div<ColProps>`
  display: block;
  max-width: ${({ span }) => `${percentFromInt(span, 24)}%`};
  flex: ${({ span }) => `0 0 ${percentFromInt(span, 24)}%`};
`

export const Row = styled.div<RowProps>`
  display: flex;
  flex-flow: row wrap;

  ${({ gutter }) => {
    const [gutterX, gutterY] = gutter

    return css`
      row-gap: ${gutterY}px;
      margin: 0 -${gutterX / 2}px;

      ${Col} {
        padding: 0 ${gutterX / 2}px;
      }
    `
  }}
`
