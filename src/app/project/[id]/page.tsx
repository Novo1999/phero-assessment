import Activities from '@/app/components/Project/Activities'
import Members from '@/app/components/Project/Members'
import ProjectDetailsContainer from '@/app/components/Project/ProjectDetailsContainer'
import ProjectDetailsHeader from '@/app/components/Project/ProjectDetailsHeader'
import TaskManager from '@/app/components/Task/TaskManager'
import AddTaskBtn from '@/app/components/ui/AddTaskBtn'
import { default as ManageMembers } from '@/app/components/ui/ManageMembers'
import { PROJECT_LIST_URL } from '@/utils/constants'
import { HiUserGroup } from 'react-icons/hi'
import { RxActivityLog } from 'react-icons/rx'

export async function generateStaticParams() {
  const projects = await fetch(PROJECT_LIST_URL).then((res) => res.json())

  return projects.map((project: Project) => ({ id: project.id.toString() }))
}

const ProjectDetailsPage = () => {
  return (
    <section className='flex justify-start flex-col items-start gap-3 pt-12 min-h-full bg-gradient-to-r *:text-slate-800 from-teal-200 to-teal-500 absolute w-fit sm:w-[100%]'>
      <ProjectDetailsContainer>
        <section className='flex justify-between'>
          <ProjectDetailsHeader />
          <AddTaskBtn />
        </section>
        <TaskManager />
        <section className='shadow-md p-4 mt-12 rounded-lg bg-gradient-to-r from-cyan-200 to-cyan-400'>
          <div className='flex justify-between'>
            <p className='font-bold mt-2 flex items-start gap-2'>
              <HiUserGroup />
              Assigned members
            </p>
            <ManageMembers />
          </div>
          <Members />
          <p className='font-bold mt-6 flex items-center gap-2'>
            <RxActivityLog />
            Recent activities
          </p>
          <Activities />
        </section>
      </ProjectDetailsContainer>
    </section>
  )
}
export default ProjectDetailsPage
