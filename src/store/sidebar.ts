import { create } from 'zustand'

type SidebarStoreType = SidebarStore & SidebarStoreActions

const useSidebarStore = create<SidebarStoreType>((set) => ({
  open: true,
  toggleSidebar: (isOpen: boolean) =>
    set((state) => ({
      ...state,
      open: isOpen,
    })),
}))

export default useSidebarStore
