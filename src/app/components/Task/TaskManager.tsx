'use client'
import SearchTask from './SearchTask'
import TaskContainer from './TaskContainer'
import TaskFilter from './TaskFilter'

const TaskManager = () => {
  return (
    <section className='flex justify-between flex-col'>
      <div className='flex justify-between'>
        <p className='mt-4 text-xl mb-2'>Tasks</p>
        <SearchTask />
      </div>
      <p className='text-center text-sm'>Filters</p>
      <TaskFilter />
      <TaskContainer />
    </section>
  )
}
export default TaskManager
