import useProjectsStore from '@/store/projects'
import { useParams } from 'next/navigation'
import { DropResult } from 'react-beautiful-dnd'

const useReorder = () => {
  const { id } = useParams()

  const { projects, reorderTask, addActivity, filters } = useProjectsStore()
  const currentProject = projects.find((project) => project.id === Number(id))

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result
    if (!destination) {
      return
    }

    // get task id and new status from the result
    const taskId = Number(result.draggableId.split('-')[2])
    const newStatus = destination.droppableId.split('-')[1] as Task['status']

    // if the user has dropped on the same status box, this will not fire 🔥, so unnecessary activities wont be created
    if (source.index !== destination.index) {
      reorderTask(Number(id), taskId, newStatus)
      // activity if reorder is successful
      addActivity(
        Number(id),
        `You moved ${
          currentProject?.tasks.find((task) => task.id === taskId)?.title
        } to ${newStatus} Status box`
      )
    }
  }

  return onDragEnd
}
export default useReorder
