import create from 'zustand'
import { persist } from 'zustand/middleware'

import type { SideBarStoreState } from './types'

const initialState: SideBarStoreState = {
  isOpen: false,
}

const useStore = create<SideBarStoreState>(
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

export { useStore as sidebarStore }
