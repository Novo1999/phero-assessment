'use client'
import useSidebarStore from '@/store/sidebar'
import { Button } from 'antd'
import { motion } from 'framer-motion'
import { TiArrowRight } from 'react-icons/ti'
import Sidebar from './Sidebar'

const ProjectList = () => {
  const { toggleSidebar, open } = useSidebarStore()

  return (
    <div className='flex'>
      <motion.aside
        initial={{ x: open ? -300 : 0, opacity: 0 }}
        animate={{
          x: !open ? 0 : -300,
          opacity: !open ? 1 : 0,
          transition: { delay: !open ? 0.1 : 0, ease: 'easeIn' },
        }}
        className='bg-gray-200 min-h-screen max-w-2'
      >
        <Button
          onClick={() => toggleSidebar(true)}
          className='absolute top-2'
          type='primary'
          shape='circle'
        >
          <TiArrowRight className='m-auto text-2xl' />
        </Button>
      </motion.aside>
      <Sidebar />
    </div>
  )
}
export default ProjectList
