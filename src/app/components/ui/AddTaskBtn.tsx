'use client'
import { Button, Modal } from 'antd'
import { useState } from 'react'
import AddTaskForm from '../Task/AddTaskForm'

const AddTaskBtn = ({ id }: { id: string }) => {
  const [modalOpen, setModalOpen] = useState(false)

  const hideButton = {
    style: {
      display: 'none',
    },
  }

  return (
    <>
      <Button onClick={() => setModalOpen(!modalOpen)} type='primary'>
        Add new task
      </Button>
      <Modal
        title='Add new task'
        centered
        open={modalOpen}
        okButtonProps={hideButton}
        cancelButtonProps={hideButton}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
      >
        <AddTaskForm id={id} />
      </Modal>
    </>
  )
}
export default AddTaskBtn
