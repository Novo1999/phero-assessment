'use client'
import useGetProjects from '@/hooks/useGetProjects'
import useProjectsStore from '@/store/projects'
import useSidebarStore from '@/store/sidebar'
import { Drawer } from 'antd'
import { motion } from 'framer-motion'
import React from 'react'
import { RxCross1 } from 'react-icons/rx'
import EmptyResponse from '../ui/EmptyResponse'
import Error from '../ui/ErrorResponse'
import ProjectSkeleton from '../ui/Skeletons/ProjectSkeleton'
import ProjectCard from './ProjectCard'

const Sidebar: React.FC = () => {
  const { data, isLoading, isError } = useGetProjects()

  const { projects } = useProjectsStore()

  const { open, toggleSidebar } = useSidebarStore((state) => state)

  let content = null

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
  if (!isLoading && isError) {
    content = <Error message='Could not get projects' />
  }

  if (!isLoading && !isError && data?.length === 0) {
    content = <EmptyResponse message='No projects found' />
  }
  if (!isLoading && !isError && data?.length > 0) {
    content = (
      <div className='flex flex-col gap-4'>
        {projects.map((project: Project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
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
            <p>Projects</p>
            <button onClick={onClose}>
              <RxCross1 />
            </button>
          </div>
        }
        placement='left'
        closable={false}
        onClose={onClose}
        open={open}
        key='drawer'
      >
        {content}
      </Drawer>
    </div>
  )
}

export default Sidebar
