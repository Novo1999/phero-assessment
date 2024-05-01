import { filterTasks } from './filterTasks'

const getFilteredTasksLength = (
  currentProject: Project,
  status: string,
  filters: Projects['filters']
) => {
  return currentProject?.tasks
    .filter((task) => task.status === status)
    .filter((task) => filterTasks(task, filters)).length
}
export default getFilteredTasksLength
