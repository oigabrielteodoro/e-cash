import React, { useEffect, ReactNode } from 'react'

type Props = {
  children: ReactNode
  onClose: () => void
}

export function CloseWhenKeyUpEscape({ children, onClose }: Props) {
  useEffect(() => {
    const handleKeyUp = ({ key }: KeyboardEvent) => {
      key === 'Escape' && onClose()
    }

    document.addEventListener('keyup', handleKeyUp)

    return () => document.removeEventListener('keyup', handleKeyUp)
  }, [onClose])

  return <>{children}</>
}
