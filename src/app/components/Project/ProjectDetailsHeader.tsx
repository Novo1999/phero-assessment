'use client'

import useGetProjects from '@/hooks/useGetProjects'
import useProjectsStore from '@/store/projects'
import { notFound, useParams } from 'next/navigation'

const ProjectDetailsHeader = () => {
  const { id } = useParams()
  const { projects } = useProjectsStore()
  const { isLoading, isError } = useGetProjects()
  const currentProject = projects?.find((project) => project.id === Number(id))

  // show not found page if no project found
  if (!isLoading && !isError && !currentProject) {
    notFound()
  }

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
