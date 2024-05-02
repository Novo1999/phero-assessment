'use client'

import useProjectsStore from '@/store/projects'
import moment from 'moment'
import { useParams } from 'next/navigation'

const Activities = () => {
  const { id } = useParams()

  const { projects } = useProjectsStore()
  const currentProject = projects.find((project) => project.id === Number(id))

  return (
    <div>
      {currentProject?.recentActivities?.map((item, index) => (
        <div className='flex justify-between' key={index}>
          <p>
            {index + 1}. {item.activity}
          </p>
          <p className='italic text-sm text-blue-600'>
            {moment(item.timestamp).format('YYYY-MM-DD HH:mm:ss')}
          </p>
        </div>
      ))}
    </div>
  )
}
export default Activities
