'use client'

import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd'

import TaskItem from '@/app/components/Task/TaskItem'
import useProjectsStore from '@/store/projects'
import useSidebarStore from '@/store/sidebar'
import { TASK_STATUS } from '@/utils/constants'
const TaskContainer = ({ id }: { id: string }) => {
  const { projects, reorderTask } = useProjectsStore()
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

    reorderTask(Number(id), taskId, newStatus)
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
                  className='lg:w-60 xl:w-80'
                  ref={provided.innerRef}
                  style={{
                    backgroundColor: snapshot.isDraggingOver ? 'blue' : 'grey',
                    minHeight: '200px',
                  }}
                  {...provided.droppableProps}
                >
                  <p className='text-blue-500'>{status}</p>
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
