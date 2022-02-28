import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

import { SIGN_IN } from 'lib'
import { ForwardedSteps, Steps, StepRefProps, Button, Result } from 'ui'
import {
  useCreateUser,
  Contact,
  CreatePassword,
  Profile,
  clearState,
  passStep,
} from 'core/users'

import { Layout } from './Layout'

import * as S from './CreateAccount.styled'

export function CreateAccount() {
  const stepsRef = useRef<StepRefProps>(null)
  const { email, full_name, password, errors, passed, isSuccess } =
    useCreateUser()

  useEffect(() => () => clearState(), [])

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
      <S.Container isSuccess={isSuccess}>
        {isSuccess ? (
          <S.Success>
            <Result
              status='success'
              title='Your account is created!'
              description='Now you can connect to our platform and start organizing your financial life!'
            >
              <Button to={SIGN_IN} full={false}>
                Sign in
              </Button>
            </Result>
          </S.Success>
        ) : (
          <>
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
                <Profile />
              </Steps.Step>
            </ForwardedSteps>
            <S.AlreadyHaveAccount>
              Already have an account? <Link to={SIGN_IN}>Sign in.</Link>
            </S.AlreadyHaveAccount>
          </>
        )}
      </S.Container>
    </Layout>
  )
}
