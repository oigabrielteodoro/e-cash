import styled, { css } from 'styled-components'
import type { CSSProperties, ElementType } from 'react'

import { percentFromInt } from 'lib'

type RowProps = {
  as?: ElementType
  gutter?: [number, number]
} & Partial<CSSProperties>

type GridProps = {
  columns: number
} & RowProps

type ColProps = {
  as?: ElementType
  span: number
} & Partial<CSSProperties>

export const Col = styled.div.attrs<RowProps>(({ as, ...props }) => ({
  as,
  style: props,
}))<ColProps>`
  max-width: ${({ span }) => percentFromInt(span, 24)}};
  flex: ${({ span }) => `0 0 ${percentFromInt(span, 24)}`};
`

export const Row = styled.div.attrs<RowProps>(({ as, ...props }) => ({
  as,
  style: props,
}))<RowProps>`
  display: flex;
  flex-flow: row wrap;

  ${({ gutter }) => {
    if (!gutter) return

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

export const Grid = styled.div.attrs<RowProps>(({ as, ...props }) => ({
  as,
  style: props,
}))<GridProps>`
  display: grid;
  grid-template-columns: ${({ columns }) => `repeat(${columns}, 1fr)`};

  ${({ gutter }) => {
    if (!gutter) return

    const [gutterX, gutterY] = gutter

    return css`
      row-gap: ${gutterY}px;
      column-gap: ${gutterX}px;
    `
  }}
`
