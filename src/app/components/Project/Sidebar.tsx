'use client'
import useGetProjects from '@/hooks/useGetProjects'
import useIntersectionObserver from '@/hooks/useIntersectionObserver'
import useProjectsStore from '@/store/projects'
import useSidebarStore from '@/store/sidebar'
import useThemeStore from '@/store/theme'
import { Drawer } from 'antd'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import { BiLoader } from 'react-icons/bi'
import { RxCross1 } from 'react-icons/rx'
import EmptyResponse from '../ui/EmptyResponse'
import Error from '../ui/ErrorResponse'
import ProjectSkeleton from '../ui/ProjectSkeleton'
import ProjectCard from './ProjectCard'

const Sidebar: React.FC = () => {
  const { data, isLoading, isError } = useGetProjects()
  const { projects } = useProjectsStore()
  const { loaderRef, limit, hasMore } = useIntersectionObserver({ projects })

  const { open, toggleSidebar } = useSidebarStore()

  const theme = useThemeStore((state) => state.theme)

  let content = null

  // loading state skeletons
  if (isLoading) {
    content = Array.from({ length: 10 }).map((_, index) => {
      return (
        <motion.div
          key={index}
          layout
          initial={{ y: 300, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <ProjectSkeleton />
        </motion.div>
      )
    })
  }
  // error
  if (!isLoading && isError) {
    content = <Error message='Could not get projects' />
  }

  // no data
  if (!isLoading && !isError && data?.length === 0) {
    content = <EmptyResponse message='No projects found' />
  }

  // has data
  if (!isLoading && !isError && data?.length > 0) {
    content = (
      <div className='flex flex-col gap-4'>
        <AnimatePresence mode='popLayout'>
          {projects.slice(0, limit).map((project: Project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </AnimatePresence>
      </div>
    )
  }

  const onClose = () => {
    toggleSidebar(false)
  }

  return (
    <div className='flex'>
      <Drawer
        mask={false}
        width={320}
        title={
          <div className='flex justify-between'>
            <p className='dark:text-white'>Projects</p>
            <button className='dark:text-white' onClick={onClose}>
              <RxCross1 />
            </button>
          </div>
        }
        placement='left'
        closable={false}
        onClose={onClose}
        open={open}
        key='drawer'
        style={{ backgroundColor: theme === 'dark' ? '#192232' : 'white' }}
      >
        {content}
        {/* intersects this for more data */}
        {hasMore && (
          <div ref={loaderRef} className='flex justify-center relative top-2'>
            <BiLoader className='animate-spin' />
          </div>
        )}
        {/* shows message if there is no more data */}
        {!hasMore && (
          <>
            <p className='relative text-center top-2'>End of projects</p>
            <hr className='relative w-60 m-auto top-2' />
          </>
        )}
      </Drawer>
    </div>
  )
}

export default Sidebar
