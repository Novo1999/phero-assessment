import { Modal } from 'antd'
import { Dispatch, SetStateAction, useState } from 'react'
import { BiEdit } from 'react-icons/bi'
import TaskEditModal from './TaskEditModal'

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

  const [editModalOpen, setEditModalOpen] = useState(false)

  return (
    <Modal
      title={
        <div className='flex gap-2 text-xl'>
          <p>{title}</p>
          <button
            onClick={() => setEditModalOpen(!editModalOpen)}
            className='flex gap-2 items-center text-blue-500'
          >
            <BiEdit />
            <p>Edit</p>
          </button>
        </div>
      }
      centered
      open={modalOpen}
      onOk={() => setModalOpen(false)}
      onCancel={() => setModalOpen(false)}
      className='w-full max-w-lg'
    >
      <div className='px-6 py-4'>
        <p className='text-base mb-4'>{description}</p>
        <div className='mb-4'>
          <p className='font-semibold'>Assigned by:</p>
          <p>{assignee}</p>
        </div>
        <div className='mb-4'>
          <p className='font-semibold'>Due:</p>
          <p>{dueDate}</p>
        </div>
        <div className='mb-4'>
          <p className='font-semibold'>Deadline:</p>
          <p>{deadline}</p>
        </div>
        <div className='mb-4'>
          <p className='font-semibold'>Status:</p>
          <p>{status}</p>
        </div>
        <p className='font-semibold mb-2'>Assigned team members:</p>
        <div>
          {assignedMembers.map((member, index) => (
            <p key={index} className='mb-1'>
              {member}
            </p>
          ))}
        </div>
      </div>
      <TaskEditModal
        task={task}
        modalOpen={editModalOpen}
        setModalOpen={setEditModalOpen}
      />
    </Modal>
  )
}
export default TaskModal
