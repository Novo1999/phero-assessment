import ProjectContainer from './components/Project/ProjectContainer'

export default function Home() {
  return (
    <main className='bg-gradient-to-r from-indigo-400 to-cyan-400 min-h-screen flex justify-center items-start pt-4'>
      <div>
        <h1>All Projects</h1>
        <ProjectContainer />
      </div>
    </main>
  )
}
