import Activities from '@/app/components/Project/Activities'
import Members from '@/app/components/Project/Members'
import ProjectDetailsContainer from '@/app/components/Project/ProjectDetailsContainer'
import ProjectDetailsHeader from '@/app/components/Project/ProjectDetailsHeader'
import TaskManager from '@/app/components/Task/TaskManager'
import AddTaskBtn from '@/app/components/ui/AddTaskBtn'
import { PROJECT_LIST_URL } from '@/utils/constants'

export async function generateStaticParams() {
  const projects = await fetch(PROJECT_LIST_URL).then((res) => res.json())

  return projects.map((project: Project) => ({ id: project.id.toString() }))
}

const ProjectDetailsPage = () => {
  return (
    <section className='flex justify-start flex-col items-start gap-3 pt-12 min-h-screen bg-gradient-to-r *:text-slate-800 from-teal-200 to-teal-500 absolute w-fit sm:w-[100%]'>
      <ProjectDetailsContainer>
        <section className='flex justify-between'>
          <ProjectDetailsHeader />
          <AddTaskBtn />
        </section>
        <TaskManager />
        <section className='shadow-md p-4 mt-12 rounded-lg bg-gradient-to-r from-cyan-200 to-cyan-400'>
          <p className='font-bold mt-2'>Assigned members</p>
          <Members />
          <p className='font-bold mt-6'>Recent activities</p>
          <Activities />
        </section>
      </ProjectDetailsContainer>
    </section>
  )
}
export default ProjectDetailsPage
