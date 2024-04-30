import useProjectsStore from '@/store/projects'
import { PROJECT_LIST_URL } from '@/utils/constants'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const getProjects = async () => {
  try {
    const { data } = await axios.get(PROJECT_LIST_URL)
    return data
  } catch (error) {
    return error
  }
}

const useGetProjects = () => {
  const { loadProjects } = useProjectsStore((state) => state)
  const query = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const projects = await getProjects()
      loadProjects(projects)
      return projects
    },
  })

  return query
}
export default useGetProjects
