import Activities from '@/app/components/Project/Activities'
import Members from '@/app/components/Project/Members'
import ProjectDetailsContainer from '@/app/components/Project/ProjectDetailsContainer'
import TaskContainer from '@/app/components/Task/TaskContainer'

const ProjectDetailsPage = ({ params: { id } }: { params: { id: string } }) => {
  return (
    <section className='flex justify-start flex-col items-start gap-3 pt-12 min-h-screen bg-gray-100 absolute w-fit sm:w-[100%]'>
      <ProjectDetailsContainer>
        <p className='font-bold'>Project Details</p>
        <p className='mt-4'>Tasks</p>
        <TaskContainer id={id} />
        <p className='font-bold'>Assigned members</p>
        <Members id={id} />
        <p className='font-bold'>Recent activities</p>
        <Activities id={id} />
      </ProjectDetailsContainer>
    </section>
  )
}
export default ProjectDetailsPage
