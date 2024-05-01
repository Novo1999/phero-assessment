'use client'
import useUserStore from '@/store/user'
import { default as validateEmailField } from '@/utils/validateEmail'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Input } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

const RegisterForm: React.FC = () => {
  const { users, addNewUser, setError, error } = useUserStore((state) => state)
  const router = useRouter()

  const onSubmit = (values: any) => {
    const userAlreadyExists = users.find((user) => user.email === values.email)
    if (userAlreadyExists) {
      setError('User already exists')
    } else {
      addNewUser(values)
      router.push('/login')
    }
  }

  return (
    <Form name='normal_login' className='login-form' onFinish={onSubmit}>
      <Form.Item
        name='email'
        rules={[
          { required: true, message: 'Please input your Email!' },
          // validate the email field to check if email is valid as user types
          { validator: validateEmailField },
        ]}
        validateStatus=''
      >
        <Input
          prefix={<UserOutlined className='site-form-item-icon' />}
          placeholder='Email'
        />
      </Form.Item>
      <Form.Item
        name='username'
        rules={[{ required: true, message: 'Please input your Username!' }]}
      >
        <Input
          prefix={<UserOutlined className='site-form-item-icon' />}
          placeholder='Username'
        />
      </Form.Item>
      <Form.Item
        name='password'
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          prefix={<LockOutlined className='site-form-item-icon' />}
          type='password'
          placeholder='Password'
        />
      </Form.Item>

      <Form.Item>
        <Button type='primary' htmlType='submit' className='login-form-button'>
          Register
        </Button>{' '}
        Or <Link href='/login'>Login now!</Link>
      </Form.Item>
      {error && <p className='text-red-500 font-semibold'>{error}</p>}
    </Form>
  )
}

export default RegisterForm
