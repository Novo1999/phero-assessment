'use client'

import useProjectsStore from '@/store/projects'
import { motion } from 'framer-motion'
import { useParams } from 'next/navigation'

const Activities = () => {
  const { id } = useParams()

  const { projects } = useProjectsStore()
  const currentProject = projects.find((project) => project.id === Number(id))

  return (
    <div>
      {currentProject?.recentActivities?.map((activity, index) => (
        <p key={crypto.randomUUID()}>
          {index + 1}. {activity}
        </p>
      ))}
    </div>
  )
}
export default Activities
