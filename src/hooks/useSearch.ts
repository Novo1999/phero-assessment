import useDebounce from '@/hooks/useDebounce'
import useProjectsStore from '@/store/projects'
import { useParams } from 'next/navigation'
import { ChangeEvent, useEffect, useState } from 'react'
import useMenuAnimation from './useMenuAnimation'

const useSearch = () => {
  const [search, setSearch] = useState('')
  const [searchResult, setSearchResult] = useState<Task[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [clickedTask, setClickedTask] = useState<Task>()
  const { id } = useParams()
  const { projects } = useProjectsStore()
  const scope = useMenuAnimation(!!search)
  const currentProject = projects.find((project) => project.id === Number(id))

  const handleTaskClick = (task: Task) => {
    setModalOpen(true)
    setClickedTask(task)
  }

  useEffect(() => {
    // search by the title and description
    const result =
      search &&
      currentProject?.tasks.filter(
        (task) =>
          task.title.toLowerCase().includes(search) ||
          task.description.toLowerCase().includes(search)
      )

    if (result) {
      setSearchResult(result)
    }

    // empty search results when search is empty
    if (!search) {
      setSearchResult([])
    }
  }, [currentProject?.tasks, search])

  // debounce the search for 300ms
  const debouncedSearch = useDebounce((value: string) => {
    setSearch(value.toLowerCase())
  }, 300)

  const handleSearchChange = (event: ChangeEvent<any>) => {
    const { value } = event.target
    debouncedSearch(value)
  }
  return {
    handleSearchChange,
    scope,
    searchResult,
    search,
    handleTaskClick,
    modalOpen,
    setModalOpen,
    clickedTask,
  }
}
export default useSearch
