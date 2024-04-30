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
  loadProjects: (projects: Project[]) => void
  reorderTask: (
    sourceId: number,
    newStatus: 'To Do' | 'In Progress' | 'Done'
  ) => void
}

interface Task {
  id: number
  title: string
  description: string
  assignedTo?: string[]
  dueDate?: string
  completed: boolean
}

// others
interface Task {
  id: number
  description: string
  deadline: string
  dueDate: string
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
  recentActivities: string[]
}
