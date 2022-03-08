import React from 'react'
import { AnimatePresence } from 'framer-motion'
import truncate from 'lodash/truncate'

import { Avatar, Tooltip, ShimmerEffect, Popover } from 'ui'
import { useMe } from 'client'
import { useIsOpen } from 'lib'

import { AccountUserOptions } from './AccountUserOptions'

import * as S from './AccountUser.styled'

export function AccountUser() {
  const { user, isLoading } = useMe()
  const isOpen = useIsOpen()

  const likeBeCalled = truncate(user?.likeBeCalled, {
    length: 17,
  })
  const email = truncate(user?.email, {
    length: 20,
  })

  if (!isLoading && !user) {
    return null
  }

  return (
    <Popover
      name={user?.likeBeCalled}
      customWidth='20.2rem'
      innerContent={<AccountUserOptions />}
      wrapperStyle={{ marginTop: 'auto' }}
    >
      <S.Wrapper>
        <Tooltip disabled={isOpen} message={user?.likeBeCalled ?? ''}>
          <S.Container isOpen={isOpen}>
            <ShimmerEffect isLoading={isLoading} variant='image'>
              <Avatar src={user?.avatarUrl} alt={user?.fullName} />
            </ShimmerEffect>
            <AnimatePresence>
              {isOpen && user && (
                <S.Content>
                  <ShimmerEffect isLoading={isLoading} count={2}>
                    <S.Title>{likeBeCalled}</S.Title>
                    <Tooltip message={user.email}>
                      <S.Email>{email}</S.Email>
                    </Tooltip>
                  </ShimmerEffect>
                </S.Content>
              )}
            </AnimatePresence>
          </S.Container>
        </Tooltip>
      </S.Wrapper>
    </Popover>
  )
}
