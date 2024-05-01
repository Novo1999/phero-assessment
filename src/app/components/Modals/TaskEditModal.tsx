import { Modal } from 'antd'
import { Dispatch, SetStateAction } from 'react'
import EditTaskForm from '../Task/EditTaskForm'

const TaskEditModal = ({
  modalOpen,
  setModalOpen,
  task,
}: {
  modalOpen: boolean
  setModalOpen: Dispatch<SetStateAction<boolean>>
  task: Task
}) => {
  const hideButton = {
    style: {
      display: 'none',
    },
  }
  return (
    <Modal
      title='Edit Project'
      centered
      open={modalOpen}
      onCancel={() => setModalOpen(false)}
      okButtonProps={hideButton}
      // cancelButtonProps={hideButton}
    >
      <EditTaskForm taskId={task.id} />
    </Modal>
  )
}
export default TaskEditModal
