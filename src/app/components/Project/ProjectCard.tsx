import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import { Avatar, Card } from 'antd'
import React from 'react'
import { BiEdit } from 'react-icons/bi'
import { GrFormView } from 'react-icons/gr'
import { MdDelete } from 'react-icons/md'

const { Meta } = Card

const ProjectCard = ({ project }: { project: Project }) => {
  console.log(project)
  const { projectName, createdDate } = project
  return (
    <Card
      style={{ width: 250 }}
      actions={[
        <GrFormView className='text-lg m-auto' key='view' />,
        <BiEdit className='text-base m-auto' key='edit' />,
        <MdDelete className='text-base m-auto' key='delete' />,
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
    </Card>
  )
}

export default ProjectCard
