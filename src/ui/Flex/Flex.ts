import type { CSSProperties, ElementType } from 'react'

import styled from 'styled-components'

type FlexProps = {
  as?: ElementType
} & Partial<CSSProperties>

export const Flex = styled.div.attrs<FlexProps>(({ as, ...props }) => ({
  as,
  style: props,
}))<FlexProps>`
  display: flex;
`
