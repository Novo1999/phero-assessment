'use client'

import TaskItem from '@/app/components/Task/TaskItem'
import useProjectsStore from '@/store/projects'
const TaskContainer = ({ id }: { id: string }) => {
  const { projects } = useProjectsStore()
  const currentProject = projects.find((project) => project.id === Number(id))

  console.log(currentProject)
  return (
    <div className='grid grid-cols-3 gap-4'>
      {currentProject?.tasks?.map((task) => (
        <TaskItem task={task} key={task.id} />
      ))}
    </div>
  )
}
export default TaskContainer
