import { Modal } from 'antd'
import { motion } from 'framer-motion'
import { Dispatch, SetStateAction, useState } from 'react'
import { BiEdit } from 'react-icons/bi'
import { GiSandsOfTime } from 'react-icons/gi'
import { GrStatusGood, GrUserManager } from 'react-icons/gr'
import { LuClock3 } from 'react-icons/lu'
import { RiTeamFill } from 'react-icons/ri'
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
  } = task ?? {}

  const [editModalOpen, setEditModalOpen] = useState(false)

  return (
    <Modal
      title={
        <div className='flex gap-2 text-xl'>
          <p>{title}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setEditModalOpen(!editModalOpen)}
            className='flex gap-2 items-center text-blue-500'
          >
            <BiEdit />
            <p>Edit</p>
          </motion.button>
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
          <p className='font-semibold flex items-center gap-2'>
            <GrUserManager />
            Assigned by:
          </p>
          <p>{assignee}</p>
        </div>
        <div className='mb-4'>
          <p className='font-semibold flex items-center gap-2'>
            <LuClock3 />
            Due:
          </p>
          <p>{dueDate}</p>
        </div>
        <div className='mb-4'>
          <p className='font-semibold flex items-center gap-2'>
            <GiSandsOfTime />
            Deadline:
          </p>
          <p>{deadline}</p>
        </div>
        <div className='mb-4'>
          <p className='font-semibold flex items-center gap-2'>
            <GrStatusGood />
            Status:
          </p>
          <p>{status}</p>
        </div>
        <p className='font-semibold mb-2 flex items-center gap-2'>
          <RiTeamFill />
          Assigned team members:
        </p>
        <div>
          {assignedMembers?.map((member, index) => (
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
