// store
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

interface SidebarStore {
  open: boolean
}
interface SidebarStoreActions {
  toggleSidebar: (isOpen: boolean) => void
}

interface Projects {
  projects: Project[]
  filters: {
    status: string[]
    dueDate: any
    assignee: string[]
  }
  loadProjects: (projects: Project[]) => void
  deleteProject: (id: number) => void
  reorderTask: (
    projectId: number,
    sourceId: number,
    newStatus: 'To Do' | 'In Progress' | 'Done'
  ) => void
  updateProjectName: (projectId: number, newName: string) => void
  addTask: (projectId: number, values: Task) => void
  addActivity: (projectId: number, activity: string) => void
  updateTask: (projectId: number, taskId: number, updatedValues: Task) => void
  filterTask: (status, assignee, dueDate) => void
  manageMembers: (projectId, members) => void
}

// others
interface Task {
  id: number
  title: string
  description: string
  deadline: Moment
  dueDate: Moment
  assignee: string
  assignedMembers: string[]
  status: 'To Do' | 'In Progress' | 'Done'
}

interface Project {
  id: number
  projectName: string
  createdDate: string
  tasks: Task[]
  teamMembers: string[]
  recentActivities: [
    {
      activity: string
      timestamp: Moment | string
    }
  ]
}
