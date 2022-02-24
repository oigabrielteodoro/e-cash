import React, {
  useCallback,
  useState,
  useImperativeHandle,
  useMemo,
  ReactElement,
  cloneElement,
  CSSProperties,
  forwardRef,
  ForwardRefRenderFunction,
  ForwardedRef,
} from 'react'

import toArray from 'lodash/toArray'

import { Step, Props as StepProps } from './Step'
import * as S from './Steps.styled'

type Props = {
  children: ReactElement[]
  wrapperStyle?: CSSProperties
  stepRef?: ForwardedRef<StepRefProps>
}

export type StepRefProps = {
  goNext: () => void
  goBack: () => void
  navigate: (stepIndex: number) => void
}

export function Steps({ stepRef, children, wrapperStyle }: Props) {
  const elements = toArray(children)

  const [currentStepIndex, setCurrentStepIndex] = useState(0)

  const navigate = useCallback(
    (stepIndex: number) => {
      const foundElement = elements[stepIndex]

      if (isPreparedToRender(foundElement)) {
        setCurrentStepIndex(stepIndex)
      }
    },
    [elements],
  )

  useImperativeHandle(
    stepRef,
    () => ({
      navigate,
      goNext: () => navigate(currentStepIndex + 1),
      goBack: () => navigate(currentStepIndex - 1),
    }),
    [currentStepIndex, navigate],
  )

  const element = useMemo(() => {
    const elementToRender = elements[currentStepIndex]

    if (!isPreparedToRender(elementToRender)) return null

    return elementToRender.props.children
  }, [elements, currentStepIndex])

  return (
    <>
      <S.Container style={wrapperStyle}>
        {elements.map((child, index) => {
          const stepIndex = index + 1

          const props: StepProps = {
            ...child.props,
            stepIndex,
            key: `Step.Item.${stepIndex}`,
            active: currentStepIndex === index,
            onStepClick: () => setCurrentStepIndex(index),
          }

          return cloneElement(child, props)
        })}
      </S.Container>
      <S.Content>{element}</S.Content>
    </>
  )
}

function isPreparedToRender(element?: ReactElement) {
  return element && element.props && element.props.children
}

Steps.Step = Step

const ForwardSteps: ForwardRefRenderFunction<StepRefProps, Props> = (
  { children, wrapperStyle },
  ref,
) => {
  return (
    <Steps stepRef={ref} wrapperStyle={wrapperStyle}>
      {children}
    </Steps>
  )
}

export const ForwardedSteps = forwardRef(ForwardSteps)
