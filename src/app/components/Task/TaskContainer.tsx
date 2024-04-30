'use client'

import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd'

import TaskItem from '@/app/components/Task/TaskItem'
import useProjectsStore from '@/store/projects'
import { TASK_STATUS } from '@/utils/constants'
const TaskContainer = ({ id }: { id: string }) => {
  const { projects, reorderTask } = useProjectsStore()
  console.log(projects)
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

    reorderTask(taskId, newStatus)
  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
      <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
        {TASK_STATUS.map((status) => (
          <div key={status}>
            <Droppable droppableId={`droppable-${status}`} type='task'>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={{
                    backgroundColor: snapshot.isDraggingOver ? 'blue' : 'grey',
                    width: '100%',
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
