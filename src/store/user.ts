import { create } from 'zustand'

interface User {
  email: string
  password: string
  name: string
}

interface UserStoreState {
  users: User[]
  error: string
  currentLoggedInUser: User
}

interface UserStoreActions {
  addNewUser: (newUser: User) => void
  setError: (message: string) => void
}

type UserStore = UserStoreState & UserStoreActions

const useUserStore = create<UserStore>((set) => ({
  users: [],
  currentLoggedInUser: {
    email: '',
    password: '',
    name: '',
  },
  error: '',
  setError: (message) =>
    set((state) => ({
      ...state,
      error: message,
    })),
  addNewUser: (newUser) =>
    set((state) => ({
      users: [...state.users, newUser],
    })),
}))

export default useUserStore
