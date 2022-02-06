import React from 'react'
import { FiSmile, FiActivity } from 'react-icons/fi'
import { AiOutlinePieChart, AiOutlineLogout } from 'react-icons/ai'

import { clearToken } from 'client'

import * as S from './InnerPopoverContent.styled'

export function InnerPopoverContent() {
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
          Status
        </button>
      </li>
      <li>
        <button onClick={clearToken}>
          <AiOutlineLogout size={20} />
          Log out
        </button>
      </li>
    </S.Container>
  )
}
