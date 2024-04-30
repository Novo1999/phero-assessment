'use client'
import useSidebarStore from '@/store/sidebar'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { GrDrag } from 'react-icons/gr'
import TaskModal from '../Modals/TaskModal'

const TaskItem = ({ task }: { task: Task }) => {
  const { open } = useSidebarStore()
  const { title, description, assignee, dueDate, id, status } = task
  const [isDragging, setIsDragging] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  console.log(modalOpen)

  const handleMouseDown = () => {
    setIsDragging(true)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }
  return (
    <motion.div
      className={`p-1 relative text-slate-800 hover:bg-blue-600 transition-colors duration-300 ${
        isDragging ? '' : 'border-2'
      } rounded shadow-lg mx-2 mt-2 cursor-pointer`}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <Draggable draggableId={`draggable-${status}-${id}`} index={id}>
        {(provided) => (
          <div
            onClick={() => setModalOpen(true)}
            {...provided.draggableProps}
            ref={provided.innerRef}
            className={`flex justify-between  ${
              isDragging ? 'border-2' : ''
            } items-center p-1`}
          >
            <p className='text-gray-200'>{title}</p>
            <div
              {...provided.dragHandleProps}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
            >
              <GrDrag className='text-slate-200' />
            </div>
          </div>
        )}
      </Draggable>
      {/* <div className='mb-4'>
        <h2 className='text-lg font-semibold mb-2'>Description</h2>
        <p className='text-gray-800'>{description}</p>
      </div>
      {assignedTo && (
        <div className='mb-4'>
          <h2 className='text-lg font-semibold mb-2'>Assigned To</h2>
          <ul>
            {assignedTo.map((user, index) => (
              <li key={index}>{user}</li>
            ))}
          </ul>
        </div>
      )}
      {dueDate && (
        <div className='mb-4'>
          <h2 className='text-lg font-semibold mb-2'>Due Date</h2>
          <p className='text-gray-800'>{dueDate}</p>
        </div>
      )}
      <div>
        <h2 className='text-lg font-semibold mb-2'>Status</h2>
        <p
          className={`text-gray-800 ${
            completed ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {completed ? 'Completed' : 'Incomplete'}
        </p>
      </div> */}
      <TaskModal
        task={task}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />
    </motion.div>
  )
}

export default TaskItem
