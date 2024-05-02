'use client'
import useGetProjects from '@/hooks/useGetProjects'
import useIntersectionObserver from '@/hooks/useIntersectionObserver'
import useProjectsStore from '@/store/projects'
import useSidebarStore from '@/store/sidebar'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { BiLoader } from 'react-icons/bi'
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
  const { loaderRef, limit, hasMore } = useIntersectionObserver({ projects })

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
        {projects.slice(0, limit).map((project: Project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    )
  }

  return (
    <section className='mt-4 pb-20'>
      {content}
      {hasMore && (
        <div ref={loaderRef} className='flex justify-center relative top-2'>
          <BiLoader className='animate-spin text-xl text-white' />
        </div>
      )}
      {/* shows message if there is no more data */}
      {!hasMore && (
        <>
          <p className='relative text-center top-10 text-white'>
            End of projects
          </p>
          <hr className='relative w-60 m-auto top-10 text-white' />
        </>
      )}
    </section>
  )
}
export default ProjectContainer
