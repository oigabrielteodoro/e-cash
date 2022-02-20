import React, { useState } from 'react'
import { FiSmile, FiActivity } from 'react-icons/fi'
import { AiOutlinePieChart, AiOutlineLogout } from 'react-icons/ai'

import { SignOut } from 'core/accounts'

import * as S from './AccountUserOptions.styled'

export function AccountUserOptions() {
  const [isSignOutVisible, setIsSignOutVisible] = useState(false)

  return (
    <S.Container>
      <li>
        <button aria-label='profile'>
          <FiSmile size={20} />
          Profile
        </button>
      </li>
      <li>
        <button aria-label='progress'>
          <AiOutlinePieChart size={20} />
          Progress
        </button>
      </li>
      <li>
        <button aria-label='sessions'>
          <FiActivity size={20} />
          Sessions
        </button>
      </li>
      <li>
        <button aria-label='log out' onClick={() => setIsSignOutVisible(true)}>
          <AiOutlineLogout size={20} />
          Log out
        </button>

        <SignOut
          isOpen={isSignOutVisible}
          onClose={() => setIsSignOutVisible(false)}
        />
      </li>
    </S.Container>
  )
}
