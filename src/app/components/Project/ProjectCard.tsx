import useProjectsStore from '@/store/projects'
import { Avatar, Card } from 'antd'
import Link from 'next/link'
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

  const handleDeleteProject = () => {
    deleteProject(id)
  }

  return (
    <Card
      style={{ width: 250 }}
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
        title={projectName}
        description={
          <p>
            <span className='text-blue-500 font-semibold'>Created: </span>{' '}
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
