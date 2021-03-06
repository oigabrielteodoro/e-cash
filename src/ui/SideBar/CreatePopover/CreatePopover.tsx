import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai'

import { useIsOpen } from 'lib'
import { Tooltip, Popover } from 'ui'

import { TextWithAnimation } from '../WithAnimation'

import { CreationOptions } from './CreationOptions'

import * as S from './CreatePopover.styled'

export function CreatePopover() {
  const isOpen = useIsOpen()

  return (
    <Popover
      position='right'
      innerContent={<CreationOptions />}
      wrapperStyle={{
        marginTop: '3rem',
        display: 'flex',
        alignItems: 'center',
      }}
      customWidth='70rem'
      name='create'
    >
      <Tooltip disabled={isOpen} message='Create'>
        <S.CreateButtonContainer
          size='md'
          variant='primary'
          $full={false}
          isOpen={isOpen}
        >
          <AiOutlinePlus size={18} />
          {isOpen && <TextWithAnimation>Create</TextWithAnimation>}
        </S.CreateButtonContainer>
      </Tooltip>
    </Popover>
  )
}
