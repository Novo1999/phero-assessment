'use client'
import useSidebarStore from '@/store/sidebar'
import { motion } from 'framer-motion'

const TaskItem = ({ task }: { task: Task }) => {
  const { open } = useSidebarStore()
  const { title, description, assignedTo, dueDate, completed } = task

  return (
    <motion.div
      className='p-8 relative text-slate-800 border-2 border-red-500 rounded shadow-lg'
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <h1 className='text-2xl font-bold mb-4'>Task Details</h1>
      <div className='mb-4'>
        <h2 className='text-lg font-semibold mb-2'>Task Title</h2>
        <p className='text-gray-800'>{title}</p>
      </div>
      <div className='mb-4'>
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
      </div>
    </motion.div>
  )
}

export default TaskItem
