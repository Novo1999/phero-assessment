'use client'

import useProjectsStore from '@/store/projects'
import { useParams } from 'next/navigation'

const Members = () => {
  const { id } = useParams()

  const { projects } = useProjectsStore()
  const currentProject = projects.find((project) => project.id === Number(id))

  return (
    <div>
      {currentProject?.teamMembers?.map((member, index) => (
        <p key={member}>
          {index + 1}. {member}
        </p>
      ))}
    </div>
  )
}
export default Members
