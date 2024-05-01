'use client'
import useGetProjects from '@/hooks/useGetProjects'
import useProjectsStore from '@/store/projects'
import { Button, Select } from 'antd'
import { motion } from 'framer-motion'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { MdManageAccounts } from 'react-icons/md'

const ManageMembers = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { id } = useParams()
  const { manageMembers, addActivity } = useProjectsStore()

  const { data: projects } = useGetProjects()
  const currentProject = projects?.find(
    (project: Project) => project.id === Number(id)
  )

  const teamMembers = currentProject?.teamMembers.map((member: string) => ({
    value: member,
    label: member,
  }))

  const [selectedMembers, setSelectedMembers] = useState<string[]>([])

  const handleManageMembers = () => {
    manageMembers(Number(id), selectedMembers)

    if (selectedMembers.length === 0) {
      addActivity(
        Number(id),
        `You cleared members of ${currentProject?.projectName}`
      )
    } else {
      addActivity(
        Number(id),
        `You updated members of ${
          currentProject?.projectName
        } -> ${selectedMembers.map((member) => member).join(', ')}`
      )
    }

    // when changed are saved, close the select
    setIsOpen(false)
  }

  return (
    <div className='flex flex-col gap-2 relative'>
      <Button
        className='!flex items-center gap-2'
        onClick={() => setIsOpen(!isOpen)}
        type='primary'
      >
        <MdManageAccounts />
        <p>Manage Members</p>
      </Button>
      <motion.div
        className='absolute w-full top-10 max-h-48 flex flex-col gap-4'
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -10 }}
      >
        <Button onClick={handleManageMembers}>Save Changes</Button>

        <Select
          onBlur={() => setIsOpen(false)}
          mode='multiple'
          placeholder='Add or remove members'
          value={selectedMembers}
          onChange={setSelectedMembers}
          className='w-full max-w-48 max-h-48'
          options={teamMembers}
        />
      </motion.div>
    </div>
  )
}

export default ManageMembers
