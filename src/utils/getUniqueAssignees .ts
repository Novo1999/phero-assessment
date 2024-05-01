const getUniqueAssignees = (project: Project) => {
  const assigneesSet = new Set()

  project?.tasks.forEach((task) => {
    assigneesSet.add(task.assignee)
  })

  const uniqueAssignees = Array.from(assigneesSet).map((assignee) => ({
    value: assignee,
    label: assignee,
  }))

  return uniqueAssignees
}

export default getUniqueAssignees
