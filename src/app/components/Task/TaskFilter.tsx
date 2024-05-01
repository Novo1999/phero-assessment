import useFilterTask from '@/hooks/useFilterTask'
import { TASK_STATUS } from '@/utils/constants'
import { DatePicker, Select } from 'antd'

const TaskFilter = () => {
  const {
    assignees,
    handleAssigneeChange,
    handleDueDateChange,
    handleStatusChange,
    selectedStatus,
    selectedAssignees,
  } = useFilterTask()

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
          { value: TASK_STATUS[0], label: TASK_STATUS[0] },
          { value: TASK_STATUS[1], label: TASK_STATUS[1] },
          { value: TASK_STATUS[2], label: TASK_STATUS[2] },
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
