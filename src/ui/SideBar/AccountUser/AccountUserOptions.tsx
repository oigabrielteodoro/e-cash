import React, { useState } from 'react'
import { FiSmile, FiActivity } from 'react-icons/fi'
import { AiOutlinePieChart, AiOutlineLogout } from 'react-icons/ai'

import { LogOut } from './LogOut'

import * as S from './AccountUserOptions.styled'

export function AccountUserOptions() {
  const [isLogOutVisible, setIsLogOutVisible] = useState(false)

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
        <button aria-label='log out' onClick={() => setIsLogOutVisible(true)}>
          <AiOutlineLogout size={20} />
          Log out
        </button>

        <LogOut
          isOpen={isLogOutVisible}
          onClose={() => setIsLogOutVisible(false)}
        />
      </li>
    </S.Container>
  )
}
