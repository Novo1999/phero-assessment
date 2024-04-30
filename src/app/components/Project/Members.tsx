'use client'

import TaskItem from '@/app/components/Task/TaskItem'
import useProjectsStore from '@/store/projects'

const Members = ({ id }: { id: string }) => {
  const { projects } = useProjectsStore()
  const currentProject = projects.find((project) => project.id === Number(id))

  return (
    <div>
      {currentProject?.teamMembers?.map((member: string) => (
        <p key={member}>{member}</p>
      ))}
    </div>
  )
}
export default Members
