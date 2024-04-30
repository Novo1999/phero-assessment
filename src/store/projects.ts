import { create } from 'zustand'

const useProjectsStore = create<Projects>((set) => ({
  projects: [],
  loadProjects: (projects) =>
    set((state) => ({
      ...state,
      projects,
    })),

  reorderTask: (projectId, sourceId, newStatus) =>
    set((state) => {
      const projectIndex = state.projects.findIndex(
        (project) => project.id === projectId
      )

      // if project exists
      if (projectIndex !== -1) {
        const updatedProjects = [...state.projects]

        const updatedTasks = [...updatedProjects[projectIndex].tasks]

        // Find the task index within the project
        const taskIndex = updatedTasks.findIndex((task) => task.id === sourceId)

        // If task exists
        if (taskIndex !== -1) {
          updatedTasks[taskIndex].status = newStatus

          updatedProjects[projectIndex].tasks = updatedTasks

          return {
            ...state,
            projects: updatedProjects,
          }
        }
      }

      return state
    }),
  addTask: (projectId: number, values: Task) =>
    set((state) => {
      const projectIndex = state.projects.findIndex(
        (project) => project.id === projectId
      )

      if (projectIndex !== -1) {
        const updatedProjects = [...state.projects]

        const updatedTasks = [...updatedProjects[projectIndex].tasks]

        updatedTasks.push(values)

        return {
          ...state,
          projects: updatedProjects,
        }
      } else {
        return state
      }
    }),
}))

export default useProjectsStore
