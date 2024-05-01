'use client'
import SearchTask from './SearchTask'
import TaskContainer from './TaskContainer'

const TaskManager = () => {
  return (
    <section className='flex justify-between flex-col'>
      <div className='flex justify-between'>
        <p className='mt-4 text-xl mb-2'>Tasks</p>
        <SearchTask />
      </div>
      <TaskContainer />
    </section>
  )
}
export default TaskManager
