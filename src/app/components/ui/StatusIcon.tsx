import { BiTask } from 'react-icons/bi'
import { GiProgression } from 'react-icons/gi'
import { IoCheckmarkDoneCircle } from 'react-icons/io5'
const StatusIcon = ({ status }: { status: Task['status'] }) => {
  if (status === 'To Do') {
    return <BiTask />
  } else if (status === 'In Progress') {
    return <GiProgression />
  } else {
    return <IoCheckmarkDoneCircle />
  }
}
export default StatusIcon
