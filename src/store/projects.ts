import { create } from 'zustand'

const useProjectsStore = create<Projects>((set) => ({
  projects: [],
  loadProjects: (projects) =>
    set((state) => ({
      ...state,
      projects,
    })),
}))

export default useProjectsStore
