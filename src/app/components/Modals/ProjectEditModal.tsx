import { Modal } from 'antd'
import { Dispatch, SetStateAction } from 'react'
import ProjectEditForm from '../Project/ProjectEditForm'

const ProjectEditModal = ({
  modalOpen,
  setModalOpen,
  id,
}: {
  modalOpen: boolean
  setModalOpen: Dispatch<SetStateAction<boolean>>
  id: number
}) => {
  const hideButton = {
    style: {
      display: 'none',
    },
  }

  return (
    <Modal
      title='Edit Project'
      centered
      open={modalOpen}
      onOk={() => setModalOpen(false)}
      onCancel={() => setModalOpen(false)}
      okButtonProps={hideButton}
      cancelButtonProps={hideButton}
    >
      <ProjectEditForm setModalOpen={setModalOpen} id={id} />
    </Modal>
  )
}
export default ProjectEditModal
