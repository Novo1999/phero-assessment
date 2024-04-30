'use client'
import useSidebarStore from '@/store/sidebar'
import { motion } from 'framer-motion'
import React, { ReactNode } from 'react'

const ProjectDetailsContainer = ({ children }: { children: ReactNode }) => {
  const { open } = useSidebarStore()

  return (
    <motion.div
      className='text-black relative'
      initial={{ left: 0 }}
      animate={{ left: open ? '384px' : '100px' }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  )
}

export default ProjectDetailsContainer
