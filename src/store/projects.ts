import { create } from 'zustand'

const useProjectsStore = create<Projects>((set) => ({
  projects: [],
  loadProjects: (projects) =>
    set((state) => ({
      ...state,
      projects,
    })),

  reorderTask: (sourceId, newStatus) =>
    set((state) => {
      const draggedTaskIndex = state.projects.findIndex(
        (project) => project.id === sourceId
      )
      const updatedProjects = state.projects.map((project) => {
        project.tasks[draggedTaskIndex].status = newStatus
        return project
      })
      return {
        ...state,
        projects: updatedProjects,
      }
    }),
}))

export default useProjectsStore
