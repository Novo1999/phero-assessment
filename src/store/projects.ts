import moment from 'moment'
import { create } from 'zustand'

const useProjectsStore = create<Projects>((set) => ({
  projects: [],
  filters: {
    status: [],
    dueDate: '',
    assignee: [],
  },
  loadProjects: (projects) =>
    set((state) => ({
      ...state,
      projects,
    })),

  deleteProject: (id) => {
    set((state) => {
      const updatedProjects = state.projects.filter(
        (project) => project.id !== id
      )
      return {
        ...state,
        projects: updatedProjects,
      }
    })
  },
  updateProjectName: (projectId, newName) =>
    set((state) => {
      const projectIndex = state.projects.findIndex(
        (project) => project.id === projectId
      )

      // if project exists
      if (projectIndex !== -1) {
        const updatedProjects = [...state.projects]
        updatedProjects[projectIndex].projectName = newName
        return {
          ...state,
          projects: updatedProjects,
        }
      } else {
        return state
      }
    }),
  manageMembers: (projectId, members) =>
    set((state) => {
      const projectIndex = state.projects.findIndex(
        (project) => project.id === projectId
      )

      // if project exists
      if (projectIndex !== -1) {
        const updatedProjects = [...state.projects]
        updatedProjects[projectIndex].teamMembers = members
        return {
          ...state,
          projects: updatedProjects,
        }
      } else {
        return state
      }
    }),
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

        const formattedDueDate = values.dueDate.format('YYYY-MM-DD')
        const formattedDeadline = values.deadline.format('YYYY-MM-DD')

        updatedTasks.push({
          ...values,
          dueDate: formattedDueDate,
          deadline: formattedDeadline,
          id: updatedProjects[projectIndex].tasks.length + 1,
        })

        updatedProjects.map((project) => {
          project.tasks = updatedTasks
          return project
        })

        return {
          ...state,
          projects: updatedProjects,
        }
      } else {
        return state
      }
    }),
  filterTask: (status, assignee, dueDate) =>
    set((state) => ({
      ...state,
      filters: { status, assignee, dueDate },
    })),
  updateTask: (projectId: number, taskId: number, updatedValues: Task) =>
    set((state) => {
      const projectIndex = state.projects.findIndex(
        (project) => project.id === projectId
      )

      const formattedDueDate = moment(updatedValues.dueDate).format(
        'YYYY-MM-DD'
      )
      const formattedDeadline = moment(updatedValues.deadline).format(
        'YYYY-MM-DD'
      )
      if (projectIndex !== -1) {
        const updatedProjects = [...state.projects]

        const updatedTasks = updatedProjects[projectIndex].tasks.map((task) => {
          if (task.id === taskId) {
            return {
              ...task,
              ...updatedValues,
              dueDate: formattedDueDate,
              deadline: formattedDeadline,
            }
          }
          return task
        })

        updatedProjects[projectIndex].tasks = updatedTasks

        return {
          ...state,
          projects: updatedProjects,
        }
      } else {
        return state
      }
    }),
  addActivity: (projectId: number, activity: string) =>
    set((state) => {
      const projectIndex = state.projects.findIndex(
        (project) => project.id === projectId
      )

      if (projectIndex !== -1) {
        const updatedProjects = [...state.projects]

        const updatedRecentActivities = [
          ...updatedProjects[projectIndex].recentActivities,
        ]

        updatedRecentActivities.push({
          activity,
          timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
        })

        updatedProjects[projectIndex].recentActivities =
          updatedRecentActivities as Project['recentActivities']

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
