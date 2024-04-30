'use client'
import useSidebarStore from '@/store/sidebar'
import { Header } from 'antd/es/layout/layout'
import { motion } from 'framer-motion'

const Navbar: React.FC = () => {
  const { open } = useSidebarStore()

  return (
    <>
      <div className='hidden lg:block'>
        <Header className='!px-0 shadow-md' style={{ height: '80px' }}>
          <div className='logo' />
          <nav className='h-full bg-white p-4'>
            <motion.p
              className='text-xl relative sm:text-2xl font-bold ml-2 w-fit mt-2'
              initial={{ x: 0 }}
              animate={{ x: open ? '384px' : 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              Project Management Dashboard
            </motion.p>
          </nav>
        </Header>
      </div>
      <div className='block lg:hidden'>
        <Header className='!px-0 shadow-md' style={{ height: '80px' }}>
          <div className='logo' />
          <nav className='h-full bg-white p-4'>
            <p className='text-xl relative sm:text-2xl font-bold ml-2 w-fit mt-2'>
              Project Management Dashboard
            </p>
          </nav>
        </Header>
      </div>
    </>
  )
}

export default Navbar
