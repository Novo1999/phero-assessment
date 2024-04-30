'use client'
import useGetProjects from '@/hooks/useGetProjects'
import type { DrawerProps } from 'antd'
import { Drawer } from 'antd'
import { motion } from 'framer-motion'
import React, { useState } from 'react'
import EmptyResponse from '../ui/EmptyResponse'
import Error from '../ui/ErrorResponse'
import ProjectSkeleton from '../ui/Skeletons/ProjectSkeleton'
import ProjectCard from './ProjectCard'

const Sidebar: React.FC = () => {
  const [open, setOpen] = useState(true)
  const [placement, setPlacement] = useState<DrawerProps['placement']>('left')
  const { data: projects, isLoading, isError, error } = useGetProjects()

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

  if (!isLoading && !isError && projects?.length === 0) {
    content = <EmptyResponse message='No projects found' />
  }
  if (!isLoading && !isError && projects?.length > 0) {
    content = (
      <div className='flex flex-col gap-4'>
        {projects.map((project: Project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    )
  }

  const showDrawer = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Drawer
        width={320}
        title='Projects'
        placement={placement}
        closable={false}
        onClose={onClose}
        open={open}
        key={placement}
      >
        {content}
      </Drawer>
    </>
  )
}

export default Sidebar
