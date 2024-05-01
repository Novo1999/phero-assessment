import useProjectsStore from '@/store/projects'
import { TASK_STATUS } from '@/utils/constants'
import { Button, DatePicker, Form, Input, Select } from 'antd'
import moment from 'moment'
import { useParams } from 'next/navigation'
import { Dispatch, SetStateAction, useEffect } from 'react'

const { Option } = Select

const EditTaskForm = ({
  taskId,
  setModalOpen,
}: {
  taskId: number
  setModalOpen: Dispatch<SetStateAction<boolean>>
}) => {
  const { projects, updateTask, addActivity } = useProjectsStore()

  const { id } = useParams()

  const currentProject = projects.find((project) => project.id === Number(id))

  const taskToEdit = currentProject?.tasks.find((task) => task.id === taskId)

  const [form] = Form.useForm()

  const handleSubmit = (values: Task) => {
    updateTask(Number(id), taskId, values)

    // add activity of editing a task
    addActivity(
      Number(id),
      `You edited the task ${taskToEdit?.title} in the status box: ${taskToEdit?.status}`
    )

    setModalOpen(false)
  }

  // load the default values when form opens
  useEffect(() => {
    if (taskToEdit) {
      form.setFieldsValue({
        ...taskToEdit,
        deadline: moment(taskToEdit.deadline),
        dueDate: moment(taskToEdit.dueDate),
      })
    }
  }, [form, taskToEdit])

  return (
    <Form form={form} onFinish={handleSubmit} layout='vertical'>
      <Form.Item
        name='title'
        label='Title'
        rules={[{ required: true, message: 'Please enter task title' }]}
      >
        <Input defaultValue={taskToEdit?.title} placeholder='Task title' />
      </Form.Item>
      <Form.Item
        name='description'
        label='Description'
        rules={[{ required: true, message: 'Please enter task description' }]}
      >
        <Input.TextArea
          defaultValue={taskToEdit?.description}
          rows={4}
          placeholder='Task description'
        />
      </Form.Item>
      <Form.Item
        name='deadline'
        label='Deadline'
        rules={[{ required: true, message: 'Please select deadline' }]}
      >
        <DatePicker
          defaultValue={moment(taskToEdit?.deadline)}
          placeholder='Select deadline'
        />
      </Form.Item>
      <Form.Item
        name='dueDate'
        label='Due Date'
        rules={[{ required: true, message: 'Please select due date' }]}
      >
        <DatePicker
          defaultValue={moment(taskToEdit?.dueDate)}
          placeholder='Select due date'
        />
      </Form.Item>
      <Form.Item
        name='assignee'
        label='Assignee'
        rules={[{ required: true, message: 'Please enter assignee' }]}
      >
        <Input defaultValue={taskToEdit?.assignee} placeholder='Assignee' />
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
        <Select
          defaultValue={taskToEdit?.assignedMembers}
          mode='multiple'
          placeholder='Select assigned members'
        >
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
        <Select defaultValue={taskToEdit?.status} placeholder='Select status'>
          <Option value={TASK_STATUS[0]}>{TASK_STATUS[0]}</Option>
          <Option value={TASK_STATUS[1]}>{TASK_STATUS[1]}</Option>
          <Option value={TASK_STATUS[2]}>{TASK_STATUS[2]}</Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type='primary' htmlType='submit'>
          Update Task
        </Button>
      </Form.Item>
    </Form>
  )
}

export default EditTaskForm
