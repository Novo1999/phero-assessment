import useProjectsStore from '@/store/projects'
import { Modal } from 'antd'
import { Dispatch, SetStateAction } from 'react'

const ProjectDeleteModal = ({
  modalOpen,
  setModalOpen,
  projectId,
}: {
  modalOpen: boolean
  setModalOpen: Dispatch<SetStateAction<boolean>>
  projectId: number
}) => {
  const { deleteProject } = useProjectsStore()

  const handleDelete = () => {
    deleteProject(projectId)
  }

  return (
    <Modal
      title={
        <p className='text-md font-semibold italic text-red-500'>
          Are you sure you want to delete this project?
        </p>
      }
      centered
      open={modalOpen}
      onCancel={() => setModalOpen(false)}
      okButtonProps={{
        style: {
          backgroundColor: '#c72525',
        },
      }}
      okText='Delete'
      onOk={handleDelete}
    ></Modal>
  )
}
export default ProjectDeleteModal
