import useProjectsStore from '@/store/projects'
import getUniqueAssignees from '@/utils/getUniqueAssignees '
import { DatePicker, Select } from 'antd'
import { Moment } from 'moment'
import { useParams } from 'next/navigation'
import { useState } from 'react'

const TaskFilter = () => {
  const { id } = useParams()
  const { filterTask, filters, projects } = useProjectsStore()
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

  return (
    <div
      style={{ marginBottom: '16px' }}
      className='flex gap-2 flex-col m-auto sm:flex-row'
    >
      <Select
        className='w-48 bg-white rounded-md'
        mode='multiple'
        placeholder='Status'
        value={selectedStatus}
        onChange={handleStatusChange}
        options={[
          { value: 'To Do', label: 'To Do' },
          { value: 'In Progress', label: 'In Progress' },
          { value: 'Done', label: 'Done' },
        ]}
      />
      <div className='block sm:hidden'>
        <DatePicker
          className='w-48'
          onChange={handleDueDateChange}
          placeholder='Select due date'
          popupStyle={{ left: 20 }}
        />
      </div>
      <div className='hidden sm:block'>
        <DatePicker
          className='w-48'
          onChange={handleDueDateChange}
          placeholder='Select due date'
        />
      </div>
      <Select
        className='w-48 bg-white rounded-md'
        mode='multiple'
        placeholder='Assignee'
        value={selectedAssignees}
        onChange={handleAssigneeChange}
        options={assignees}
      />
    </div>
  )
}

export default TaskFilter
