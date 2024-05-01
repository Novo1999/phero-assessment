import { AiOutlineProject } from 'react-icons/ai'
import ProjectContainer from './components/Project/ProjectContainer'

export default function Home() {
  return (
    <main className='bg-gradient-to-r from-indigo-400 to-cyan-400 min-h-screen dark:bg-gradient-to-r dark:from-gray-900 dark:to-slate-700 flex justify-center items-start pt-4'>
      <div>
        <h1 className='flex items-center dark:text-white gap-2 text-xl'>
          <AiOutlineProject className='animate-bounce' />
          All Projects
        </h1>
        <ProjectContainer />
      </div>
    </main>
  )
}
