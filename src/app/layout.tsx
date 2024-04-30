import ReactQueryProvider from '@/providers/ReactQueryProvider'
import ToastProvider from '@/providers/ToastProvider'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

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
      <body className={inter.className}>
        <ReactQueryProvider>
          <ToastProvider>
            <AntdRegistry>{children}</AntdRegistry>
          </ToastProvider>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
