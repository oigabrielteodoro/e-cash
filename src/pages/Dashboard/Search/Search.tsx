import React, { useState } from 'react'
import { FiSearch } from 'react-icons/fi'

import * as S from './Search.styled'

export function Search() {
  const [isLoading, setIsLoading] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  function handleOnClick() {
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 5000)
  }

  function handleOnFocus() {
    setIsFocused(true)
  }

  function handleOnBlur() {
    setIsFocused(false)
  }

  return (
    <S.Container isFocused={isFocused}>
      <input
        placeholder='Search by name'
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
      />
      <button disabled={isLoading} type='submit' onClick={handleOnClick}>
        {isLoading ? <S.LoadIcon /> : <FiSearch size={16} />}
      </button>
    </S.Container>
  )
}
