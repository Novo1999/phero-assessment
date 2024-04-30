import { Modal } from 'antd'
import { Dispatch, SetStateAction } from 'react'

const TaskModal = ({
  modalOpen,
  setModalOpen,
}: {
  modalOpen: boolean
  setModalOpen: Dispatch<SetStateAction<boolean>>
}) => {
  return (
    <Modal
      title='Vertically centered modal dialog'
      centered
      open={modalOpen}
      onOk={() => setModalOpen(false)}
      onCancel={() => setModalOpen(false)}
    >
      <p>some contents...</p>
      <p>some contents...</p>
      <p>some contents...</p>
    </Modal>
  )
}
export default TaskModal
