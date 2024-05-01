import { THEME_TYPES } from '@/utils/constants'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const { THEME_LIGHT, THEME_DARK } = THEME_TYPES

interface ThemeStoreState {
  theme: typeof THEME_LIGHT | typeof THEME_DARK
  toggleTheme: () => void
}

const useThemeStore = create<ThemeStoreState>(
  persist(
    (set) => ({
      theme: THEME_LIGHT,
      toggleTheme: () =>
        set((state: any) => ({
          theme: state.theme === THEME_LIGHT ? THEME_DARK : THEME_LIGHT,
        })),
    }),
    {
      name: 'theme',
    }
  ) as any
)

export default useThemeStore
