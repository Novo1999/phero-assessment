import useProjectsStore from '@/store/projects'
import useThemeStore from '@/store/theme'
import { Avatar, Card, Tooltip } from 'antd'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { BiEdit } from 'react-icons/bi'
import { GrFormView } from 'react-icons/gr'
import { MdDelete } from 'react-icons/md'
import ProjectDeleteModal from '../Modals/ProjectDeleteModal'
import ProjectEditModal from '../Modals/ProjectEditModal'

const { Meta } = Card

const ProjectCard = ({ project }: { project: Project }) => {
  const { projectName, createdDate, id } = project
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const theme = useThemeStore((state) => state.theme)

  // check if user is in home page
  const pathname = usePathname()
  const isHome = pathname === '/'

  const handleDeleteProject = () => {
    setDeleteModalOpen(true)
  }

  return (
    <motion.div
      whileHover={{ y: -2 }}
      initial={{ opacity: 0, y: -200 }}
      animate={{ opacity: 1, y: 0 }}
      layout
      exit={{ y: -300, opacity: 0 }}
    >
      <Card
        style={{ background: theme === 'dark' ? '#222831' : 'white' }}
        className={`${
          isHome ? 'w-60 min-[375px]:w-72' : 'w-60 !ml-4'
        } shadow-md`}
        actions={[
          <Link key='view' href={`/project/${id}`}>
            <Tooltip placement='top' title='View'>
              <GrFormView className='text-lg m-auto' />
            </Tooltip>
          </Link>,
          <Tooltip key='edit' placement='top' title='Edit'>
            <BiEdit
              onClick={() => setEditModalOpen(!editModalOpen)}
              className='text-base m-auto'
            />
          </Tooltip>,
          <Tooltip key='edit' placement='top' title='Delete'>
            <MdDelete
              onClick={handleDeleteProject}
              className='text-base m-auto hover:text-red-500'
              key='delete'
            />
          </Tooltip>,
        ]}
      >
        <Meta
          title={
            <Link href={`/project/${id}`}>
              {
                <p>
                  {id}.{projectName}
                </p>
              }
            </Link>
          }
          description={
            <p className='dark:text-white'>
              <span className='text-slate-400 font-semibold'>Created: </span>{' '}
              {createdDate}
            </p>
          }
        />
        {/* project edit modal */}
        <ProjectEditModal
          id={id}
          modalOpen={editModalOpen}
          setModalOpen={setEditModalOpen}
        />
      </Card>
      {/* project delete modal */}
      <ProjectDeleteModal
        projectId={id}
        modalOpen={deleteModalOpen}
        setModalOpen={setDeleteModalOpen}
      />
    </motion.div>
  )
}

export default ProjectCard
