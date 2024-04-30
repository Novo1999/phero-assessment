import { Modal } from 'antd'
import { Dispatch, SetStateAction } from 'react'

const TaskModal = ({
  modalOpen,
  setModalOpen,
  task,
}: {
  modalOpen: boolean
  setModalOpen: Dispatch<SetStateAction<boolean>>
  task: Task
}) => {
  const {
    title,
    description,
    assignee,
    deadline,
    dueDate,
    assignedMembers,
    status,
  } = task

  return (
    <Modal
      title={title}
      centered
      open={modalOpen}
      onOk={() => setModalOpen(false)}
      onCancel={() => setModalOpen(false)}
    >
      <p>{description}</p>
      <p>Assigned by: {assignee}</p>
      <p>Due: {dueDate}</p>
      <p>Deadline: {deadline}</p>
      <p>Status: {status}</p>
      <p className='font-semibold'>Assigned team members: </p>
      <div>
        {assignedMembers.map((member) => (
          <p key={member}>{member}</p>
        ))}
      </div>
    </Modal>
  )
}
export default TaskModal
