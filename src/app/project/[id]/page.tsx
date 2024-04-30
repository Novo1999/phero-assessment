const ProjectDetailsPage = ({ params: { id } }) => {
  console.log(id)
  return (
    <section className='flex justify-center items-center min-h-screen bg-gray-100 absolute w-screen'>
      <div className='p-8 bg-white rounded shadow-lg'>
        <h1 className='text-2xl font-bold mb-4'>Task Details</h1>
        <div className='mb-4'>
          <h2 className='text-lg font-semibold mb-2'>Task Title</h2>
          <p className='text-gray-800'>Task Title Here</p>
        </div>
        <div className='mb-4'>
          <h2 className='text-lg font-semibold mb-2'>Description</h2>
          <p className='text-gray-800'>Task Description Here</p>
        </div>
        {/* Add more task details as needed */}
      </div>
    </section>
  )
}
export default ProjectDetailsPage
