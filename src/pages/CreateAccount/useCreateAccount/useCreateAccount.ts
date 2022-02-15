import create from 'zustand'

type StoreState = {
  email?: string
  full_name?: string
  password?: string
  password_confirmation?: string
}

const initialState: StoreState = {}

const useStore = create<StoreState>(() => initialState)

export function setState(state: StoreState) {
  useStore.setState(state)
}

export function useCreateAccount() {
  const store = useStore((state) => state)

  return {
    ...store,
  }
}
