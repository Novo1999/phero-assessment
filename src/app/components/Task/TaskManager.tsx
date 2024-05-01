'use client'
import { AiFillFilter } from 'react-icons/ai'
import { RiStackFill } from 'react-icons/ri'
import SearchTask from './SearchTask'
import TaskContainer from './TaskContainer'
import TaskFilter from './TaskFilter'

const TaskManager = () => {
  return (
    <section className='flex justify-between flex-col'>
      <div className='flex justify-between'>
        <p className='mt-4 text-xl mb-2 flex items-center gap-2 dark:text-white'>
          <RiStackFill />
          Tasks
        </p>
        <SearchTask />
      </div>
      <p className='m-auto mb-4 text-md flex items-center gap-2 dark:text-white'>
        <AiFillFilter />
        Filters
      </p>
      <TaskFilter />
      <TaskContainer />
    </section>
  )
}
export default TaskManager
