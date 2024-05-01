'use client'
import useUserStore from '@/store/user'
import validateEmailField from '@/utils/validateEmail'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Input } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Bounce, toast } from 'react-toastify'

const LoginForm: React.FC = () => {
  const { users, setCurrentLoggedInUser, setError, error } = useUserStore()
  const router = useRouter()

  const onSubmit = (values: any) => {
    // find the user
    const matchedUser = users.find((user) => user.email === values.email)
    // see if password is matched
    const passwordMatched = matchedUser?.password === values.password
    // log in the user if everything is alright
    if (!matchedUser) {
      setError('User does not exist')
    } else if (!passwordMatched) {
      setError('Wrong password')
    } else {
      setCurrentLoggedInUser(matchedUser.username)
      toast.success('Logged in successfully', {
        position: 'bottom-right',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      })
      router.push('/')
    }
  }

  return (
    <Form name='normal_login' className='login-form' onFinish={onSubmit}>
      <Form.Item
        name='email'
        rules={[
          { required: true, message: 'Please input your Email!' },
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
          Log in
        </Button>{' '}
        Or <Link href='/register'>Register now!</Link>
      </Form.Item>
      {error && <p className='text-red-500 font-semibold'>{error}</p>}
    </Form>
  )
}

export default LoginForm
