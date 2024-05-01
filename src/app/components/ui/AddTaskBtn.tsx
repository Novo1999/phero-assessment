'use client'
import { Button, Modal } from 'antd'
import { useState } from 'react'
import { IoAddCircleSharp } from 'react-icons/io5'
import AddTaskForm from '../Task/AddTaskForm'

const AddTaskBtn = () => {
  const [modalOpen, setModalOpen] = useState(false)

  const hideButton = {
    style: {
      display: 'none',
    },
  }

  return (
    <>
      <Button
        className='!flex items-center gap-2'
        onClick={() => setModalOpen(!modalOpen)}
        type='primary'
      >
        <IoAddCircleSharp />
        <p>Add new task</p>
      </Button>
      <Modal
        title={
          <p className='flex items-center gap-2'>
            <IoAddCircleSharp />
            Add new task
          </p>
        }
        centered
        open={modalOpen}
        okButtonProps={hideButton}
        cancelButtonProps={hideButton}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
      >
        <AddTaskForm />
      </Modal>
    </>
  )
}
export default AddTaskBtn
