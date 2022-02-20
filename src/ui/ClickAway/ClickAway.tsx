import { useEffect, useRef, cloneElement, ReactElement, RefObject } from 'react'

type Props = {
  isOpen: boolean
  children: ReactElement
  ignoredRefs?: RefObject<HTMLElement>[]
  onClose: () => void
}

export function ClickAway({
  children,
  isOpen,
  ignoredRefs = [],
  onClose,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleOnClick(event: MouseEvent) {
      if (isOpen && ref.current) {
        const isIgnored = !!ignoredRefs.find((ignoredRef) =>
          hasBlocked(ignoredRef, event.target),
        )

        if (!hasBlocked(ref, event.target) && !isIgnored) {
          onClose()
        }
      }
    }

    document.addEventListener('mousedown', handleOnClick)

    return () => {
      document.removeEventListener('mousedown', handleOnClick)
    }
  }, [ref, ignoredRefs, isOpen, onClose])

  return cloneElement(children, {
    ...children.props,
    ref,
  })
}

function hasBlocked(ref: RefObject<HTMLElement>, target: EventTarget | null) {
  return ref.current?.contains(target as Node)
}
