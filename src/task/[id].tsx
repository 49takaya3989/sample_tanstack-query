import { useGetTaskById } from '../service/task';

function Task() {
  const { data, isPending } = useGetTaskById()

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