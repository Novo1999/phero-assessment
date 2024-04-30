import { create } from 'zustand'

interface User {
  email: string
  password: string
  username: string
}

interface UserStoreState {
  users: User[]
  error: string
  currentLoggedInUser: string
}

interface UserStoreActions {
  addNewUser: (newUser: User) => void
  setError: (message: string) => void
  setCurrentLoggedInUser: (user: string) => void
}

type UserStore = UserStoreState & UserStoreActions

const useUserStore = create<UserStore>((set) => ({
  // logged in user
  currentLoggedInUser: '',
  setCurrentLoggedInUser: (user) =>
    set((state) => ({
      ...state,
      currentLoggedInUser: user,
    })),
  // error
  error: '',
  setError: (message) =>
    set((state) => ({
      ...state,
      error: message,
    })),
  // users
  users: [],
  addNewUser: (newUser) =>
    set((state) => ({
      users: [...state.users, newUser],
    })),
}))

export default useUserStore
