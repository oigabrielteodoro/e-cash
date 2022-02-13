import React, { useRef } from 'react'
import { MdAlternateEmail } from 'react-icons/md'
import { Link } from 'react-router-dom'

import { SIGN_IN } from 'lib'
import { Button, Input, Steps, ForwardedSteps, StepRefProps } from 'ui'

import { Layout } from './Layout'
import * as S from './CreateAccount.styled'

export function CreateAccount() {
  const stepsRef = useRef<StepRefProps>(null)

  return (
    <Layout>
      <S.Container>
        <ForwardedSteps ref={stepsRef}>
          <Steps.Step>
            <strong onClick={() => stepsRef?.current?.navigate(2)}>
              Your information
            </strong>
            <p>
              Tell us a little more about yourself! That way we will be able to
              create a better relationship 😄
            </p>
            <S.Form>
              <Input
                id='email'
                label='Email'
                icon={MdAlternateEmail}
                placeholder='example@mail.com'
              />
              <Input
                id='full_name'
                label='Full Name'
                icon={MdAlternateEmail}
                placeholder='Ex: John Doe'
              />
              <Button
                size='lg'
                type='submit'
                onClick={() => stepsRef.current?.goNext()}
              >
                Continue
              </Button>
            </S.Form>
          </Steps.Step>
          <Steps.Step isDisabled>
            <h1>Step 2</h1>
          </Steps.Step>
          <Steps.Step isDisabled>
            <h1>Step 3</h1>
          </Steps.Step>
        </ForwardedSteps>

        <S.AlreadyHaveAccount>
          Already have an account? <Link to={SIGN_IN}>Sign in.</Link>
        </S.AlreadyHaveAccount>
      </S.Container>
    </Layout>
  )
}
