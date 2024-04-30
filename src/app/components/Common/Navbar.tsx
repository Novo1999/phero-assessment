'use client'
import { Layout, Menu } from 'antd'
import Link from 'next/link'
import React from 'react'

const { Header } = Layout

const Navbar: React.FC = () => {
  return (
    <Header className='!px-0' style={{ height: '64px' }}>
      <div className='logo' />
      <Menu theme='light' mode='horizontal' defaultSelectedKeys={['1']}>
        <Menu.Item key='1'>
          <Link href='/'>Home</Link>
        </Menu.Item>
        <Menu.Item key='2'>
          <Link href='/about'>About</Link>
        </Menu.Item>
        <Menu.Item key='3'>
          <Link href='/services'>Services</Link>
        </Menu.Item>
        <Menu.Item key='4'>
          <Link href='/contact'>Contact</Link>
        </Menu.Item>
      </Menu>
    </Header>
  )
}

export default Navbar
