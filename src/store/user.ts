import { create } from 'zustand'

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
