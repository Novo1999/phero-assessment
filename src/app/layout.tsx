import ReactQueryProvider from '@/providers/ReactQueryProvider'
import ToastProvider from '@/providers/ToastProvider'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import Navbar from './components/Common/Navbar'
import ProjectList from './components/Project/ProjectList'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: 'Programming hero assessment',
  description: 'Created by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={poppins.className}>
        <ReactQueryProvider>
          <ToastProvider>
            <AntdRegistry>
              <Navbar />
              {children}
              <ProjectList />
            </AntdRegistry>
          </ToastProvider>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
