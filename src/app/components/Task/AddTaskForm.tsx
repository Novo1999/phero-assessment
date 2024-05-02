import useProjectsStore from '@/store/projects'
import { TASK_STATUS } from '@/utils/constants'
import { PlusOutlined } from '@ant-design/icons'
import { Button, DatePicker, Form, Input, Select } from 'antd'
import { useParams } from 'next/navigation'
import { Dispatch, SetStateAction } from 'react'

const { Option } = Select

const AddTaskForm = ({
  setModalOpen,
}: {
  setModalOpen: Dispatch<SetStateAction<boolean>>
}) => {
  const { id } = useParams()
  const { projects, addTask, addActivity } = useProjectsStore()
  const currentProject = projects.find((project) => project.id === Number(id))

  const [form] = Form.useForm()

  const handleSubmit = (values: Task) => {
    console.log(values.dueDate)
    addTask(Number(id), values)
    // add activity of adding a new task after successfully adding a task
    addActivity(Number(id), `You added a new task ${values.title}`)
    form.resetFields()
    setModalOpen(false)
  }

  return (
    <Form form={form} onFinish={handleSubmit} layout='vertical'>
      <Form.Item
        name='title'
        label='Title'
        rules={[{ required: true, message: 'Please enter task title' }]}
      >
        <Input placeholder='Task title' />
      </Form.Item>
      <Form.Item
        name='description'
        label='Description'
        rules={[{ required: true, message: 'Please enter task description' }]}
      >
        <Input.TextArea rows={4} placeholder='Task description' />
      </Form.Item>
      <Form.Item
        name='deadline'
        label='Deadline'
        rules={[{ required: true, message: 'Please select deadline' }]}
      >
        <DatePicker placeholder='Select deadline' />
      </Form.Item>
      <Form.Item
        name='dueDate'
        label='Due Date'
        rules={[{ required: true, message: 'Please select due date' }]}
      >
        <DatePicker placeholder='Select due date' />
      </Form.Item>
      <Form.Item
        name='assignee'
        label='Assignee'
        rules={[{ required: true, message: 'Please enter assignee' }]}
      >
        <Input placeholder='Assignee' />
      </Form.Item>
      <Form.Item
        name='assignedMembers'
        label='Assigned Members'
        rules={[
          {
            required: true,
            message: 'Please select assigned members',
            type: 'array',
          },
        ]}
      >
        <Select mode='multiple' placeholder='Select assigned members'>
          {/* options for assigned members */}
          {currentProject?.teamMembers.map((member) => (
            <Option key={member} value={member}>
              {member}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name='status'
        label='Status'
        rules={[{ required: true, message: 'Please select status' }]}
      >
        <Select placeholder='Select status'>
          <Option value={TASK_STATUS[0]}>{TASK_STATUS[0]}</Option>
          <Option value={TASK_STATUS[1]}>{TASK_STATUS[1]}</Option>
          <Option value={TASK_STATUS[2]}>{TASK_STATUS[2]}</Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type='primary' htmlType='submit' icon={<PlusOutlined />}>
          Add Task
        </Button>
      </Form.Item>
    </Form>
  )
}

export default AddTaskForm
