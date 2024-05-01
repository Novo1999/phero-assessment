'use client'
import useSidebarStore from '@/store/sidebar'
import useUserStore from '@/store/user'
import { splitString } from '@/utils/splitString'
import { UserOutlined } from '@ant-design/icons'
import { Avatar } from 'antd'
import { Header } from 'antd/es/layout/layout'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const charVariants = {
  hidden: {
    opacity: 0,
  },
  reveal: {
    opacity: 1,
  },
}

const text = '🎯 Project Management Dashboard'

const headingTextCharacters = splitString(text)

const Navbar: React.FC = () => {
  const { open } = useSidebarStore()
  const pathname = usePathname()
  const isHome = pathname === '/'

  const { currentLoggedInUser } = useUserStore()

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
              {/* if user is not in home, he can go to the home page through the header text link */}
              {!isHome ? (
                <Link href='/'>
                  <motion.div
                    initial='hidden'
                    animate='reveal'
                    transition={{ staggerChildren: 0.1 }}
                  >
                    {headingTextCharacters.map((char, index) => (
                      <motion.span
                        variants={charVariants}
                        key={index}
                        transition={{ duration: 0.5 }}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </motion.div>
                </Link>
              ) : (
                <motion.p
                  initial='hidden'
                  animate='reveal'
                  transition={{ staggerChildren: 0.1 }}
                >
                  {/* text animation */}
                  {headingTextCharacters.map((char, index) => (
                    <motion.span
                      variants={charVariants}
                      key={index}
                      transition={{ duration: 0.5 }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </motion.p>
              )}
            </motion.div>
            {/* profile */}
            {currentLoggedInUser && (
              <div className='flex items-center gap-2'>
                <p>{currentLoggedInUser}</p>
                <Avatar shape='circle' size={32} icon={<UserOutlined />} />
              </div>
            )}
          </nav>
        </Header>
      </div>
      {/* header for mobile*/}
      <div className='block lg:hidden'>
        <Header className='!px-0 shadow-md' style={{ height: '80px' }}>
          <div className='logo' />
          <nav className='h-full bg-white pl-2 sm:p-4 flex items-center justify-between'>
            {!isHome ? (
              <Link
                className='text-xl relative sm:text-2xl font-bold ml-2 w-fit mt-2'
                href='/'
              >
                {text}
              </Link>
            ) : (
              <p className='font-bold sm:text-xl'>{text}</p>
            )}
            {currentLoggedInUser && (
              <div className='flex items-center gap-2'>
                <p className='hidden min-[425px]:block'>
                  {currentLoggedInUser}
                </p>
                <Avatar shape='circle' size={32} icon={<UserOutlined />} />
              </div>
            )}
          </nav>
        </Header>
      </div>
    </>
  )
}

export default Navbar
