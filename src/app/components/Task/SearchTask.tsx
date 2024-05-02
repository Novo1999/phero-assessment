'use client'
import useSearch from '@/hooks/useSearch'
import { Empty } from 'antd'
import { default as Search } from 'antd/es/transfer/search'
import { motion } from 'framer-motion'
import TaskModal from '../Modals/TaskModal'

const SearchTask = () => {
  const {
    handleSearchChange,
    scope,
    searchResult,
    search,
    handleTaskClick,
    modalOpen,
    setModalOpen,
    clickedTask,
  } = useSearch()

  return (
    <div className='float-end my-4'>
      <Search onChange={handleSearchChange} placeholder='Search Tasks' />
      <nav className='menu' ref={scope}>
        <li className='hidden'></li>
        {searchResult.length > 0 ? (
          <ul
            className='bg-white absolute w-[217px] mt-2 p-3 z-10'
            style={{
              pointerEvents: !!searchResult ? 'auto' : 'none',
              clipPath: 'inset(10% 50% 90% 50% round 10px)',
            }}
          >
            <p className='text-xs mb-2 italic text-blue-500'>
              Search result for: {search}
            </p>
            {searchResult.map((task) => (
              <motion.li
                onClick={() => handleTaskClick(task)}
                whileHover={{
                  scale: 0.98,
                }}
                whileTap={{
                  scale: 0.92,
                }}
                className='cursor-pointer p-2 border mb-2 rounded-lg shadow-md break-all bg-gradient-to-r from-sky-400 to-blue-500 text-white'
                key={task.id}
              >
                {task.title}
              </motion.li>
            ))}
          </ul>
        ) : (
          <ul
            className='bg-white absolute w-[217px] mt-2 p-3 z-10'
            style={{
              pointerEvents: !!searchResult ? 'auto' : 'none',
              clipPath: 'inset(10% 50% 90% 50% round 10px)',
            }}
          >
            <p className='text-xs mb-2 italic text-blue-500'>
              Search result for: {search}
            </p>
            <div className='text-sm text-center'>
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}>
                No match for {search}
              </Empty>
            </div>
          </ul>
        )}
      </nav>
      {/* task modal for the tasks in the search result */}
      <TaskModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        task={clickedTask!}
      />
    </div>
  )
}
export default SearchTask
