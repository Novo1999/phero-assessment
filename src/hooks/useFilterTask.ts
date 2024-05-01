import useProjectsStore from '@/store/projects'
import getUniqueAssignees from '@/utils/getUniqueAssignees '
import { Moment } from 'moment'
import { useParams } from 'next/navigation'
import { useState } from 'react'

const useFilterTask = () => {
  const { id } = useParams()
  const { filterTask, projects } = useProjectsStore()
  const currentProject = projects.find((project) => project.id === Number(id))
  const [selectedStatus, setSelectedStatus] = useState<string[]>([])
  const [selectedAssignees, setSelectedAssignees] = useState<string[]>([])
  const [selectedDueDate, setSelectedDueDate] = useState<Moment | null>(null)

  // get the assignees list from the current project
  const assignees = getUniqueAssignees(currentProject as Project)

  const handleStatusChange = (value: string[]) => {
    setSelectedStatus(value)
    filterTasks({
      status: value,
      assignee: selectedAssignees,
      dueDate: selectedDueDate ? selectedDueDate.format('YYYY-MM-DD') : null,
    })
  }

  const handleAssigneeChange = (value: string[]) => {
    setSelectedAssignees(value)
    filterTasks({
      status: selectedStatus,
      assignee: value,
      dueDate: selectedDueDate ? selectedDueDate.format('YYYY-MM-DD') : null,
    })
  }

  const handleDueDateChange = (date: Moment | null) => {
    setSelectedDueDate(date)
    filterTasks({
      status: selectedStatus,
      assignee: selectedAssignees,
      dueDate: date ? date.format('YYYY-MM-DD') : null,
    })
  }

  // function to filter tasks
  const filterTasks = ({ status, assignee, dueDate }: Projects['filters']) => {
    filterTask(status, assignee, dueDate)
  }

  return {
    assignees,
    handleAssigneeChange,
    handleDueDateChange,
    handleStatusChange,
    selectedStatus,
    selectedAssignees,
  }
}
export default useFilterTask
