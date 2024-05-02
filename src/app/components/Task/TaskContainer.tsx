'use client'

import TaskItem from '@/app/components/Task/TaskItem'
import useReorder from '@/hooks/useReorder'
import useProjectsStore from '@/store/projects'
import useSidebarStore from '@/store/sidebar'
import { TASK_STATUS } from '@/utils/constants'
import { filterTasks } from '@/utils/filterTasks'
import getFilteredTasksLength from '@/utils/getFilteredTasksLength'
import { useParams } from 'next/navigation'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import StatusIcon from '../ui/StatusIcon'

// for readability
const ONE = 1

const TaskContainer = () => {
  const { id } = useParams()
  const { projects, filters } = useProjectsStore()
  const { open } = useSidebarStore()
  const currentProject = projects.find((project) => project.id === Number(id))

  const onDragEnd = useReorder()

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 ${
          open ? 'lg:grid-cols-2' : 'lg:grid-cols-3'
        } xl:grid-cols-3 gap-4`}
      >
        {/* mapping over 3 status to show the tasks for each status type */}
        {TASK_STATUS.map((status) => (
          <div key={status}>
            <Droppable droppableId={`droppable-${status}`} type='task'>
              {(provided, snapshot) => (
                <div
                  className={`lg:w-60 xl:w-80 shadow-lg min-h-48 max-h-60 status-box overflow-y-auto rounded-lg ${
                    snapshot.isDraggingOver
                      ? 'bg-gradient-to-r from-indigo-500 to-blue-500 transition-all duration-300 border-2 border-slate-700'
                      : 'bg-gradient-to-r from-blue-600 to-violet-600 '
                  } p-2 shadow-md`}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <p className='text-slate-200 font-bold flex items-center gap-2'>
                    <StatusIcon status={status as Task['status']} />
                    {status}
                  </p>
                  {/* show count of tasks */}
                  <p className='text-sm italic text-yellow-500'>
                    {getFilteredTasksLength(currentProject!, status, filters)}{' '}
                    {getFilteredTasksLength(currentProject!, status, filters) >
                    ONE
                      ? 'tasks'
                      : 'task'}
                  </p>
                  {/* filter and map the tasks */}
                  {currentProject?.tasks
                    .filter((task) => task.status === status)
                    .filter((task) => filterTasks(task, filters))
                    .map((task) => (
                      <TaskItem key={task.id} task={task} />
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  )
}

export default TaskContainer
