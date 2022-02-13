import create from 'zustand'

type StoreState = {
  email?: string
  full_name?: string
}

const initialState: StoreState = {
  email: undefined,
  full_name: undefined,
}

const useStore = create<StoreState>(() => initialState)

export function setState({ email, full_name }: StoreState) {
  useStore.setState({
    email,
    full_name,
  })
}

export function useCreateAccount() {
  const store = useStore((state) => state)

  return {
    ...store,
  }
}
