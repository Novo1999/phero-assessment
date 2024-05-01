'use client'
import useGetProjects from '@/hooks/useGetProjects'
import useProjectsStore from '@/store/projects'
import useSidebarStore from '@/store/sidebar'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import EmptyResponse from '../ui/EmptyResponse'
import Error from '../ui/ErrorResponse'
import Loader from '../ui/Loading'
import ProjectCard from './ProjectCard'

const ProjectContainer = () => {
  const { data, isLoading, isError } = useGetProjects()
  const pathname = usePathname()
  const isHome = pathname === '/'
  const { projects } = useProjectsStore()
  const { toggleSidebar } = useSidebarStore()

  // close sidebar on mount on homepage
  useEffect(() => {
    toggleSidebar(false)
  }, [toggleSidebar])

  let content = null

  // loading state
  if (isLoading) {
    content = (
      <div className='min-h-[90vh] flex items-center'>
        <Loader />
      </div>
    )
  }
  // error state
  if (!isLoading && isError) {
    content = <Error message='Could not get projects' />
  }

  // if there are no projects
  if (!isLoading && !isError && data?.length === 0) {
    content = <EmptyResponse message='No projects found' />
  }

  // if there are projects
  if (!isLoading && !isError && data?.length > 0) {
    content = (
      <div
        className={`${
          isHome
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
            : 'flex flex-col'
        } gap-4`}
      >
        {projects.map((project: Project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    )
  }

  return <section className='mt-4 pb-20'>{content}</section>
}
export default ProjectContainer
