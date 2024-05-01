import useProjectsStore from '@/store/projects'
import { TASK_STATUS } from '@/utils/constants'
import { CheckboxChangeEvent } from 'antd/es/checkbox'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-toastify'

const useTaskItemOperation = (task: Task) => {
  const { id: projectId } = useParams()
  const { updateTask, addActivity } = useProjectsStore()

  const { title, id } = task
  const [isDragging, setIsDragging] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  const handleMouseDown = () => {
    setIsDragging(true)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleComplete = (e: CheckboxChangeEvent) => {
    const checked = e.target.checked
    updateTask(Number(projectId), id, {
      ...task,
      status: checked ? (TASK_STATUS[2] as Task['status']) : 'Done',
    })
    addActivity(Number(projectId), `You marked ${title} as completed`)
    toast.success(`${title} is marked as completed`, {
      autoClose: 1000,
      position: 'bottom-right',
    })
  }

  return {
    isDragging,
    setModalOpen,
    handleMouseDown,
    handleComplete,
    handleMouseUp,
    modalOpen,
  }
}
export default useTaskItemOperation
