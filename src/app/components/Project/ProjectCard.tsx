import useProjectsStore from '@/store/projects'
import { Avatar, Card } from 'antd'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { BiEdit } from 'react-icons/bi'
import { GrFormView } from 'react-icons/gr'
import { MdDelete } from 'react-icons/md'
import ProjectEditModal from '../Modals/ProjectEditModal'

const { Meta } = Card

const ProjectCard = ({ project }: { project: Project }) => {
  const { deleteProject } = useProjectsStore()
  const { projectName, createdDate, id } = project
  const [modalOpen, setModalOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'

  const handleDeleteProject = () => {
    deleteProject(id)
  }

  return (
    <Card
      className={`${isHome ? 'w-60 min-[375px]:w-72' : 'w-60 !ml-4'}`}
      actions={[
        <Link key='view' href={`/project/${id}`}>
          <GrFormView className='text-lg m-auto' />
        </Link>,
        <BiEdit
          onClick={() => setModalOpen(!modalOpen)}
          className='text-base m-auto'
          key='edit'
        />,
        <MdDelete
          onClick={handleDeleteProject}
          className='text-base m-auto hover:text-red-500'
          key='delete'
        />,
      ]}
    >
      <Meta
        avatar={
          <Avatar src='https://api.dicebear.com/7.x/miniavs/svg?seed=8' />
        }
        title={<Link href={`/project/${id}`}>{projectName}</Link>}
        description={
          <p>
            <span className='text-slate-400 font-semibold'>Created: </span>{' '}
            {createdDate}
          </p>
        }
      />
      <ProjectEditModal
        id={id}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />
    </Card>
  )
}

export default ProjectCard
