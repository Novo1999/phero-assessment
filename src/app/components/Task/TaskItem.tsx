'use client'
import useTaskItemOperation from '@/hooks/useTaskItemOperation'
import { Checkbox } from 'antd'
import { motion } from 'framer-motion'
import { Draggable } from 'react-beautiful-dnd'
import { GrDrag } from 'react-icons/gr'
import TaskModal from '../Modals/TaskModal'

const TaskItem = ({ task }: { task: Task }) => {
  const { title, id, status } = task

  const {
    isDragging,
    setModalOpen,
    handleMouseDown,
    handleComplete,
    handleMouseUp,
    modalOpen,
  } = useTaskItemOperation(task)

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
              isDragging ? 'border-2 rounded p-1' : ''
            } items-center`}
          >
            <p className='text-gray-200'>{title}</p>
            <div
              {...provided.dragHandleProps}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              className='flex gap-2 items-center'
            >
              {status !== 'Done' && (
                <Checkbox
                  onChange={handleComplete}
                  onClick={(e) => e.stopPropagation()}
                />
              )}
              <GrDrag className='text-slate-200' />
            </div>
          </div>
        )}
      </Draggable>
      <TaskModal
        task={task}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />
    </motion.div>
  )
}

export default TaskItem
