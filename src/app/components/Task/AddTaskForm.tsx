import useProjectsStore from '@/store/projects'
import { PlusOutlined } from '@ant-design/icons'
import { Button, DatePicker, Form, Input, Select } from 'antd'
import { useState } from 'react'

const { Option } = Select

const AddTaskForm = ({ id }: { id: string }) => {
  const { projects, addTask } = useProjectsStore()
  console.log('🚀 ~ AddTaskForm ~ projects:', projects)
  const currentProject = projects.find((project) => project.id === Number(id))

  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  const handleSubmit = (values: Task) => {
    setLoading(true)

    console.log(values)
    addTask(Number(id), values)
    form.resetFields()

    setLoading(false)
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
          {/* Add options for assigned members */}
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
          <Option value='To Do'>To Do</Option>
          <Option value='In Progress'>In Progress</Option>
          <Option value='Done'>Done</Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button
          type='primary'
          htmlType='submit'
          loading={loading}
          icon={<PlusOutlined />}
        >
          Add Task
        </Button>
      </Form.Item>
    </Form>
  )
}

export default AddTaskForm
