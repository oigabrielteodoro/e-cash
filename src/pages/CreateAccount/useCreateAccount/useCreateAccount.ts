import create from 'zustand'

export type CreateAccountStoreState = {
  email?: string
  full_name?: string
  password?: string
  monthly_income?: string
  financial_objective?: string
}

const initialState: CreateAccountStoreState = {}

const useStore = create<CreateAccountStoreState>(() => initialState)

export function setState(state: CreateAccountStoreState) {
  useStore.setState(state)
}

export function useCreateAccount() {
  const store = useStore((state) => state)

  return {
    ...store,
  }
}
