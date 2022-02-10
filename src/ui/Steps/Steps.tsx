import React, {
  useState,
  ReactElement,
  cloneElement,
  CSSProperties,
  ReactNode,
} from 'react'

import toArray from 'lodash/toArray'
import isEqual from 'lodash/isEqual'

import { Step, Props as StepProps } from './Step'
import * as S from './Steps.styled'

type Props = {
  children: ReactElement[]
  wrapperStyle?: CSSProperties
}

export function Steps({ children, wrapperStyle }: Props) {
  const elements = toArray(children)

  const [element, setElement] = useState<ReactNode>(() => {
    const firstElement = elements[0]

    return firstElement?.props?.children
  })

  return (
    <>
      <S.Container style={wrapperStyle}>
        {elements.map((child, index) => {
          const props: StepProps = {
            ...child.props,
            stepIndex: index + 1,
            onStepClick: setElement,
            isActive: isEqual(element, child.props.children),
          }

          return cloneElement(child, props)
        })}
      </S.Container>
      <S.Content>{element}</S.Content>
    </>
  )
}

Steps.Step = Step
