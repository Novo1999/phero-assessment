import useProjectsStore from '@/store/projects'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Form, Input } from 'antd'
import { Dispatch, SetStateAction } from 'react'
import { toast } from 'react-toastify'

const ProjectEditForm = ({
  id,
  setModalOpen,
}: {
  id: number
  setModalOpen: Dispatch<SetStateAction<boolean>>
}) => {
  const [form] = Form.useForm()
  const { projects, updateProjectName } = useProjectsStore()
  const currentProject = projects.find((project) => project.id === id)

  // submits the updated value
  const handleSubmit = (values: { title: string }) => {
    updateProjectName(id, values.title)
    // reset field after updating
    form.resetFields()
    // close the modal
    setModalOpen(false)
    toast.success('Edited project name successfully', {
      autoClose: 1000,
    })
  }

  return (
    <Form form={form} onFinish={handleSubmit} layout='vertical'>
      <Form.Item
        name='title'
        label='Project Name'
        initialValue={currentProject?.projectName}
        rules={[{ required: true, message: 'Please enter project name' }]}
      >
        <Input placeholder='Project name' />
      </Form.Item>
      <Form.Item>
        <Button type='primary' htmlType='submit' icon={<PlusOutlined />}>
          Update Name
        </Button>
      </Form.Item>
    </Form>
  )
}

export default ProjectEditForm
