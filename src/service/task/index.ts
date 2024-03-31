import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { todoKeys } from './key'
import { createTask, deleteTask, getTaskById, loadTasks, toggleCompleteTask } from './function'

export const useLoadTasks = () => {
  const { data, isSuccess, isPending, isError } = useQuery({
    queryKey: todoKeys.lists(),
    queryFn: loadTasks,
  })

  return { data, isSuccess, isPending, isError }
}

export const useGetTaskById = (taskId: string) => {
  const { data, isSuccess, isPending, isError } = useQuery({
    queryKey: todoKeys.list(taskId),
    queryFn: () => getTaskById(taskId),
    enabled: !!taskId
  })

  return { data, isSuccess, isPending, isError }
}

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  const mutateCreate = useMutation({
    mutationFn: createTask,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: todoKeys.lists() }),
  })

  return { mutateCreate }
}

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  const mutateDelete = useMutation({
    mutationFn: deleteTask,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: todoKeys.lists() }),
  })

  return { mutateDelete }
}

export const useToggleCompleteTask = () => {
  const queryClient = useQueryClient();

  const mutateToggleComplete = useMutation({
    mutationFn: toggleCompleteTask,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: todoKeys.lists() }),
  })

  return { mutateToggleComplete }
}