import React from 'react'

import { Avatar, Tooltip, ShimmerEffect } from 'ui'
import { useMe } from 'client'

import { AnimatePresence } from 'framer-motion'
import { useIsOpen } from '../useSideBar'

import * as S from './AccountUser.styled'

export function AccountUser() {
  const { user, isLoading } = useMe()
  const isOpen = useIsOpen()

  if (!user) {
    return null
  }

  return (
    <S.Wrapper>
      <Tooltip isDisabled={isOpen} message={user.like_be_called}>
        <S.Container isOpen={isOpen}>
          <ShimmerEffect isLoading={isLoading} variant='image'>
            <Avatar src={user.avatar_url} alt={user.full_name} />
          </ShimmerEffect>
          <AnimatePresence>
            {isOpen && (
              <S.Content>
                <ShimmerEffect isLoading={isLoading} count={2}>
                  <S.Title>{user.like_be_called}</S.Title>
                  <S.Email>{user.email}</S.Email>
                </ShimmerEffect>
              </S.Content>
            )}
          </AnimatePresence>
        </S.Container>
      </Tooltip>
    </S.Wrapper>
  )
}
