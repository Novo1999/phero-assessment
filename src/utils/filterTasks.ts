// this filters by one of the field or multiple
export const filterTasks = (task: Task, filters: Projects['filters']) => {
  let includeTask = true
  if (filters.status.length > 0 && !filters.status.includes(task.status)) {
    includeTask = false
  }

  if (
    filters.assignee.length > 0 &&
    !filters.assignee.includes(task.assignee)
  ) {
    includeTask = false
  }

  if (filters.dueDate && task.dueDate !== filters.dueDate) {
    includeTask = false
  }

  return includeTask
}
