import React, { useRef } from 'react'
import { Link } from 'react-router-dom'

import { SIGN_IN } from 'lib'
import { ForwardedSteps, Steps, StepRefProps } from 'ui'

import { Layout } from './Layout'
import { Contact } from './Contact'
import { CreatePassword } from './CreatePassword'

import * as S from './CreateAccount.styled'
import { useCreateAccount } from './useCreateAccount'
import { Profile } from './Profile'

export function CreateAccount() {
  const stepsRef = useRef<StepRefProps>(null)
  const { email, full_name, password } = useCreateAccount()

  return (
    <Layout>
      <S.Container>
        <ForwardedSteps ref={stepsRef}>
          <Steps.Step>
            <Contact onSubmit={() => stepsRef.current?.goNext()} />
          </Steps.Step>
          <Steps.Step disabled={!email || !full_name}>
            <CreatePassword onSubmit={() => stepsRef.current?.goNext()} />
          </Steps.Step>
          <Steps.Step disabled={!password}>
            <Profile />
          </Steps.Step>
          <Steps.Step disabled={!password}>
            <h1>Avatar</h1>
          </Steps.Step>
        </ForwardedSteps>

        <S.AlreadyHaveAccount>
          Already have an account? <Link to={SIGN_IN}>Sign in.</Link>
        </S.AlreadyHaveAccount>
      </S.Container>
    </Layout>
  )
}
