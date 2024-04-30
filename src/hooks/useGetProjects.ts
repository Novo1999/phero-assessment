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
  const query = useQuery({ queryKey: ['projects'], queryFn: getProjects })

  return query
}
export default useGetProjects
