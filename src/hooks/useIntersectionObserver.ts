import { useEffect, useRef, useState } from 'react'
import { delay } from '../utils/delay'

interface UseIntersectionObserverProps {
  projects: Project[]
}

const useIntersectionObserver = ({
  projects,
}: UseIntersectionObserverProps) => {
  const [limit, setLimit] = useState<number>(10)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const loaderRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (limit === projects?.length) {
      setHasMore(false)
    }
    // intersection callback
    const onIntersection = (items: IntersectionObserverEntry[]) => {
      const loaderItem = items[0]
      // load more when intersection happens
      if (loaderItem.isIntersecting && hasMore) {
        // load more after 2 seconds fake delay because did not make any api for this
        delay(1500).then(() => setLimit((prevLimit) => prevLimit + 10))
      }
    }

    // observer
    const observer = new IntersectionObserver(onIntersection)

    if (observer && loaderRef.current) {
      observer.observe(loaderRef.current)
    }
    // cleanup
    return () => {
      if (observer) observer.disconnect()
    }
  }, [setHasMore, projects, hasMore, limit])

  return { loaderRef, limit, hasMore }
}

export default useIntersectionObserver
