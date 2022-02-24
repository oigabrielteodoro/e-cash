import { cloneElement, ReactElement } from 'react'

type Props = {
  children: ReactElement
  padding?: string
  margin?: string
  marginRight?: string
}

export function Space({ children, ...style }: Props) {
  return cloneElement(children, {
    style,
  })
}
