'use client'
import useSidebarStore from '@/store/sidebar'
import { motion } from 'framer-motion'
import { Draggable, Droppable } from 'react-beautiful-dnd'

const TaskItem = ({ task }: { task: Task }) => {
  const { open } = useSidebarStore()
  const { title, description, assignee, dueDate, id, status } = task

  return (
    <motion.div
      className='p-1 relative text-slate-800 border-2 rounded shadow-lg'
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <Draggable draggableId={`draggable-${status}-${id}`} index={id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className='mb-4'
          >
            <h2 className='text-lg font-semibold'>Task Title</h2>
            <p className='text-gray-800'>{title}</p>
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
    </motion.div>
  )
}

export default TaskItem
