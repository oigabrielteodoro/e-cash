import React, { useState } from 'react'
import { FiSmile, FiActivity } from 'react-icons/fi'
import { AiOutlinePieChart, AiOutlineLogout } from 'react-icons/ai'

import { LogOut } from './LogOut'

import * as S from './InnerPopoverContent.styled'

export function InnerPopoverContent() {
  const [isLogOutVisible, setIsLogOutVisible] = useState(false)

  return (
    <S.Container>
      <li>
        <button>
          <FiSmile size={20} />
          Profile
        </button>
      </li>
      <li>
        <button>
          <AiOutlinePieChart size={20} />
          Progress
        </button>
      </li>
      <li>
        <button>
          <FiActivity size={20} />
          Sessions
        </button>
      </li>
      <li>
        <button onClick={() => setIsLogOutVisible(true)}>
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
