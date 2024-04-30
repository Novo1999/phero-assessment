import RegisterForm from '../components/Auth/RegisterForm'

export default function RegisterPage() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center'>
      <div className='w-96 p-8 bg-white rounded-lg shadow-lg border-2'>
        <h2 className='text-2xl font-semibold mb-4 text-black'>Register</h2>
        <RegisterForm />
        <p className='text-red-500' />
        {/* <div className='flex justify-between mt-4'>
          <p className='text-black'>Already have an account?</p>
          <a className='text-blue-500' href='/login'>
            Login Now
          </a>
        </div> */}
      </div>
    </main>
  )
}
