'use client'

import useProjectsStore from '@/store/projects'
import { useParams } from 'next/navigation'

const ProjectDetailsHeader = () => {
  const { id } = useParams()
  const { projects } = useProjectsStore()
  const currentProject = projects.find((project) => project.id === Number(id))

  return (
    <div className='dark:text-white'>
      <p className='font-bold'>Project Details</p>
      <p className='italic underline underline-offset-8 text-slate-600 dark:text-white'>
        {currentProject?.projectName}
      </p>
    </div>
  )
}
export default ProjectDetailsHeader
