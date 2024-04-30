'use client'

import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd'

import TaskItem from '@/app/components/Task/TaskItem'
import useProjectsStore from '@/store/projects'
import useSidebarStore from '@/store/sidebar'
import { TASK_STATUS } from '@/utils/constants'
const TaskContainer = ({ id }: { id: string }) => {
  const { projects, reorderTask, addActivity } = useProjectsStore()
  const { open } = useSidebarStore()
  const currentProject = projects.find((project) => project.id === Number(id))

  const onDragStart = () => {
    console.log('drag start', id)
  }

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result
    if (!destination) {
      return
    }

    const taskId = Number(result.draggableId.split('-')[2])
    const newStatus = destination.droppableId.split('-')[1] as
      | 'To Do'
      | 'In Progress'
      | 'Done'

    console.log(result)

    if (source.index !== destination.index) {
      reorderTask(Number(id), taskId, newStatus)
      addActivity(
        Number(id),
        `You moved ${
          currentProject?.tasks.find((task) => task.id === taskId)?.title
        } to ${newStatus} Status box`
      )
    }
  }

  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 ${
        open ? 'lg:grid-cols-2' : 'lg:grid-cols-3'
      } xl:grid-cols-3 gap-4`}
    >
      <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
        {TASK_STATUS.map((status) => (
          <div key={status}>
            <Droppable droppableId={`droppable-${status}`} type='task'>
              {(provided, snapshot) => (
                <div
                  className={`lg:w-60 xl:w-80 min-h-48 max-h-48 overflow-y-auto ${
                    snapshot.isDraggingOver
                      ? 'bg-gradient-to-r from-indigo-500 to-blue-500'
                      : 'bg-gradient-to-r from-blue-600 to-violet-600 '
                  } p-2`}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <p className='text-slate-200'>{status}</p>
                  {currentProject?.tasks
                    .filter((task) => task.status === status)
                    .map((task) => (
                      <TaskItem key={task.id} task={task} />
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </DragDropContext>
    </div>
  )
}

export default TaskContainer
