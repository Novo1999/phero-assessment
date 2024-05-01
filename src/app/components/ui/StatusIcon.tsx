import { TASK_STATUS } from '@/utils/constants'
import { BiTask } from 'react-icons/bi'
import { GiProgression } from 'react-icons/gi'
import { IoCheckmarkDoneCircle } from 'react-icons/io5'

const StatusIcon = ({ status }: { status: Task['status'] }) => {
  if (status === TASK_STATUS[0]) {
    return <BiTask />
  } else if (status === TASK_STATUS[1]) {
    return <GiProgression />
  } else {
    return <IoCheckmarkDoneCircle />
  }
}
export default StatusIcon
