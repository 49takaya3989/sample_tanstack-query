import { useParams } from 'react-router-dom';
import { useGetTaskById } from '../service/task';

function Task() {
  const params = useParams();
  const id = params.id ?? ''
  const { data, isPending } = useGetTaskById(id)

  if (isPending) return <p>loading...</p>

  return (
    <div>
      <p>{data?.id}</p>
      <p>{data?.task}</p>
      <p>{String(data?.completed)}</p>
    </div>
  )
}

export default Task;