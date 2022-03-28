export type User = {
  email: string
  fullName: string
  likeBeCalled: string
  avatarUrl: string | null
}

export type UseMeResponse = {
  user: User
}
