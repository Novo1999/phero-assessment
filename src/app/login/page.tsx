import LoginForm from '../components/Auth/LoginForm'

export default function LoginPage() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center'>
      <div className='w-96 p-8 bg-white rounded-lg shadow-lg border-2'>
        <h2 className='text-2xl font-semibold mb-4 text-black'>Login</h2>
        <LoginForm />
        <p className='text-red-500' />
      </div>
    </main>
  )
}
