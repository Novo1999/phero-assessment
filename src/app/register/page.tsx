import RegisterForm from '../components/Auth/RegisterForm'

export default function RegisterPage() {
  return (
    <main className='flex min-h-screen bg-gradient-to-r from-violet-600 to-purple-600 dark:bg-gradient-to-r dark:from-gray-900 dark:to-slate-700 flex-col items-center justify-center'>
      <div className='w-60 min-[375px]:w-72 min-[425px]:w-80 sm:w-96 p-8 bg-white rounded-lg shadow-lg border-2'>
        <h2 className='text-2xl font-semibold mb-4 text-black'>Register</h2>
        <RegisterForm />
        <p className='text-red-500' />
      </div>
    </main>
  )
}
