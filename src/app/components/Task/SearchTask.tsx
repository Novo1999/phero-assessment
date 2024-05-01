'use client'
import useDebounce from '@/hooks/useDebounce'
import useMenuAnimation from '@/hooks/useMenuAnimation'
import useProjectsStore from '@/store/projects'
import { default as Search } from 'antd/es/transfer/search'
import { motion } from 'framer-motion'
import { useParams } from 'next/navigation'
import { ChangeEvent, useEffect, useState } from 'react'
import TaskModal from '../Modals/TaskModal'

const SearchTask = () => {
  const [search, setSearch] = useState('')
  const [searchResult, setSearchResult] = useState<Task[]>([])
  const { id } = useParams()
  const { projects } = useProjectsStore()
  const scope = useMenuAnimation(searchResult.length > 0)
  const currentProject = projects.find((project) => project.id === Number(id))
  const [modalOpen, setModalOpen] = useState(false)
  const [clickedTask, setClickedTask] = useState<Task>()

  const handleTaskClick = (task: Task) => {
    setModalOpen(true)
    setClickedTask(task)
  }

  useEffect(() => {
    // search by the title and description
    const result =
      search &&
      currentProject?.tasks.filter(
        (task) =>
          task.title.toLowerCase().includes(search) ||
          task.description.toLowerCase().includes(search)
      )
    if (result) {
      setSearchResult(result)
    }

    if (!search) {
      setSearchResult([])
    }
  }, [currentProject?.tasks, search])

  const debouncedSearch = useDebounce((value: string) => {
    setSearch(value.toLowerCase())
  }, 300)

  const handleSearchChange = (event: ChangeEvent<any>) => {
    const { value } = event.target
    debouncedSearch(value)
  }

  return (
    <div className='float-end my-4'>
      <Search onChange={handleSearchChange} placeholder='input search text' />
      <nav className='menu' ref={scope}>
        <ul
          className='bg-white absolute w-[217px] mt-2 p-3 z-10'
          style={{
            pointerEvents: !!searchResult ? 'auto' : 'none',
            clipPath: 'inset(10% 50% 90% 50% round 10px)',
          }}
        >
          <li className='hidden'></li>
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
      </nav>
      <TaskModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        task={clickedTask!}
      />
    </div>
  )
}
export default SearchTask
