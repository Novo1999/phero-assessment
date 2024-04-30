'use client'

import useProjectsStore from '@/store/projects'

const Activities = ({ id }: { id: string }) => {
  const { projects } = useProjectsStore()
  const currentProject = projects.find((project) => project.id === Number(id))

  return (
    <div>
      {currentProject?.recentActivities?.map((activity: string) => (
        <p key={activity}>{activity}</p>
      ))}
    </div>
  )
}
export default Activities
