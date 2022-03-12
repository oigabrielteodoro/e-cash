import styled, { css } from 'styled-components'
import type { CSSProperties, ElementType } from 'react'

import { percentFromInt } from 'lib'
import { theme } from 'config'

type RowProps = {
  as?: ElementType
  gutter?: [number, number]
} & Partial<CSSProperties>

type GridProps = {
  columns: number
} & RowProps

type ColProps = {
  as?: ElementType
  span?: number
  xsm?: number
  sm?: number
  md?: number
  lg?: number
  xlg?: number
} & Partial<CSSProperties>

export const Col = styled.div.attrs<ColProps>(({ as, ...props }) => ({
  as,
  style: props,
}))<ColProps>`
  ${({ span }) =>
    span &&
    css`
      flex: 0 0 ${percentFromInt(span, 24)};
      max-width: ${percentFromInt(span, 24)};
    `};

  ${({ xsm }) =>
    xsm &&
    css`
      @media screen and (max-width: ${theme.breakpoints.xsm}) {
        flex: 0 0 ${percentFromInt(xsm, 24)};
        max-width: ${percentFromInt(xsm, 24)};
      }
    `}

  ${({ sm }) =>
    sm &&
    css`
      @media screen and (max-width: ${theme.breakpoints.sm}) {
        flex: 0 0 ${percentFromInt(sm, 24)};
        max-width: ${percentFromInt(sm, 24)};
      }
    `}

  ${({ md }) =>
    md &&
    css`
      @media screen and (max-width: ${theme.breakpoints.md}) {
        flex: 0 0 ${percentFromInt(md, 24)};
        max-width: ${percentFromInt(md, 24)};
      }
    `}

    ${({ lg }) =>
    lg &&
    css`
      @media screen and (min-width: ${theme.breakpoints
          .md}) and (max-width: ${theme.breakpoints.lg}) {
        flex: 0 0 ${percentFromInt(lg, 24)};
        max-width: ${percentFromInt(lg, 24)};
      }
    `}

  ${({ xlg }) =>
    xlg &&
    css`
      @media screen and (min-width: ${theme.breakpoints.lg}) {
        flex: 0 0 ${percentFromInt(xlg, 24)};
        max-width: ${percentFromInt(xlg, 24)};
      }
    `}
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
