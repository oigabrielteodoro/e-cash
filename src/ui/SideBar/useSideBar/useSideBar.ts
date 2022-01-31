import create from 'zustand'
import { persist } from 'zustand/middleware'

import type { StoreState } from './types'

const initialState: StoreState = {
  isOpen: false,
}

const useStore = create<StoreState>(
  persist((_, __) => initialState, {
    name: '@e-cash:layout',
  }),
)

export function useIsOpen() {
  return useStore((state) => state.isOpen)
}

export function setState(stateValue: boolean) {
  useStore.setState({
    isOpen: stateValue,
  })
}
