'use client'
import useSidebarStore from '@/store/sidebar'
import { UserOutlined } from '@ant-design/icons'
import { Avatar } from 'antd'
import { Header } from 'antd/es/layout/layout'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Navbar: React.FC = () => {
  const { open } = useSidebarStore()
  const pathname = usePathname()
  const isHome = pathname === '/'

  return (
    <>
      <div className='hidden lg:block'>
        <Header className='!px-0 shadow-md' style={{ height: '80px' }}>
          <div className='logo' />
          <nav
            className={`h-full bg-white p-4 flex items-center ${
              !isHome ? 'lg:justify-between' : 'justify-evenly'
            } gap-60`}
          >
            <motion.div
              className='text-xl relative sm:text-2xl font-bold ml-2 w-fit mt-2'
              initial={{ x: 0 }}
              animate={{ x: open ? '384px' : 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              {!isHome ? (
                <Link href='/'>Project Management Dashboard</Link>
              ) : (
                <p>Project Management Dashboard</p>
              )}
            </motion.div>
            <div className='flex items-center gap-2'>
              <p>Name</p>
              <Avatar shape='circle' size={32} icon={<UserOutlined />} />
            </div>
          </nav>
        </Header>
      </div>
      {/* header */}
      <div className='block lg:hidden'>
        <Header className='!px-0 shadow-md' style={{ height: '80px' }}>
          <div className='logo' />
          <nav className='h-full bg-white pl-2 sm:p-4 flex items-center justify-between'>
            {!isHome ? (
              <Link
                className='text-xl relative sm:text-2xl font-bold ml-2 w-fit mt-2'
                href='/'
              >
                Project Management Dashboard
              </Link>
            ) : (
              <p className='font-bold sm:text-xl'>
                Project Management Dashboard
              </p>
            )}
            <div className='flex items-center gap-2'>
              <p className='hidden min-[425px]:block'>Name</p>
              <Avatar shape='circle' size={32} icon={<UserOutlined />} />
            </div>
          </nav>
        </Header>
      </div>
    </>
  )
}

export default Navbar
