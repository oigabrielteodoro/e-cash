import React, { useRef } from 'react'
import { Link } from 'react-router-dom'

import { SIGN_IN } from 'lib'
import { ForwardedSteps, Steps, StepRefProps } from 'ui'

import { Layout } from './Layout'
import { Contact } from './Contact'
import { Profile } from './Profile'
import { CreatePassword } from './CreatePassword'
import { passStep, useCreateAccount } from './useCreateAccount'

import * as S from './CreateAccount.styled'

export function CreateAccount() {
  const stepsRef = useRef<StepRefProps>(null)
  const { email, full_name, password, errors, passed } = useCreateAccount()

  function handleOnSubmit(name: string) {
    stepsRef.current?.goNext()
    passStep(name)
  }

  function getStatus(name: string) {
    if (errors.includes(name)) return 'error'
    if (passed.includes(name)) return 'success'

    return 'info'
  }

  return (
    <Layout>
      <S.Container>
        <ForwardedSteps ref={stepsRef}>
          <Steps.Step title='Contact' status={getStatus('contact')}>
            <Contact onSubmit={() => handleOnSubmit('contact')} />
          </Steps.Step>
          <Steps.Step
            title='Password'
            status={getStatus('password')}
            disabled={!email || !full_name}
          >
            <CreatePassword onSubmit={() => handleOnSubmit('password')} />
          </Steps.Step>
          <Steps.Step
            title='Profile'
            status={getStatus('profile')}
            disabled={!password}
          >
            <Profile onSubmit={() => handleOnSubmit('profile')} />
          </Steps.Step>
        </ForwardedSteps>

        <S.AlreadyHaveAccount>
          Already have an account? <Link to={SIGN_IN}>Sign in.</Link>
        </S.AlreadyHaveAccount>
      </S.Container>
    </Layout>
  )
}
