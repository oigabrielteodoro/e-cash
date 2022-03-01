import React, { useRef } from 'react'
import { ForwardedSteps, StepRefProps, Steps } from 'ui'

import { render, screen, userEvent } from '__helpers__/app-tests'

function MockedComponent() {
  const ref = useRef<StepRefProps>(null)

  return (
    <ForwardedSteps ref={ref}>
      <Steps.Step>
        <h1>Step 1</h1>
        <button onClick={() => ref.current?.goNext()}>Go next two</button>
      </Steps.Step>
      <Steps.Step>
        <h1>Step 2</h1>
        <button onClick={() => ref.current?.goBack()}>Go back one</button>
      </Steps.Step>
      <Steps.Step>
        <h1>Step 3</h1>
        <button onClick={() => ref.current?.navigate(0)}>
          Go navigate zero
        </button>
      </Steps.Step>
    </ForwardedSteps>
  )
}

describe('Steps', () => {
  it('should be able match snapshot', () => {
    const { container } = render(<MockedComponent />)

    expect(container).toMatchSnapshot()
  })

  it('should be able render correctly', () => {
    render(<MockedComponent />)

    expect(screen.getByText('Step 1')).toBeInTheDocument()
  })

  it('should be able navigate to step two using step navigation', async () => {
    render(<MockedComponent />)

    expect(screen.getByText('Step 1')).toBeInTheDocument()

    userEvent.click(screen.getByLabelText('Step Control 2'))

    expect(await screen.findByText('Step 2')).toBeInTheDocument()
  })

  it('should be able next and back', async () => {
    render(<MockedComponent />)

    expect(screen.getByText('Step 1')).toBeInTheDocument()

    userEvent.click(
      screen.getByRole('button', {
        name: 'Go next two',
      }),
    )

    expect(await screen.findByText('Step 2')).toBeInTheDocument()

    userEvent.click(
      screen.getByRole('button', {
        name: 'Go back one',
      }),
    )

    expect(await screen.findByText('Step 1')).toBeInTheDocument()
  })

  it('should be able navigate to step three and navigate to step zero', async () => {
    render(<MockedComponent />)

    expect(screen.getByText('Step 1')).toBeInTheDocument()

    userEvent.click(screen.getByLabelText('Step Control 3'))

    expect(await screen.findByText('Step 3')).toBeInTheDocument()

    userEvent.click(
      screen.getByRole('button', {
        name: 'Go navigate zero',
      }),
    )

    expect(await screen.findByText('Step 1')).toBeInTheDocument()
  })
})
