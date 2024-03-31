import './App.css'
import React, { FormEvent, useCallback, useState } from 'react';
import { useCreateTask, useDeleteTask, useLoadTasks, useToggleCompleteTask } from './service/task';
import { Task } from './service/task/type';

const App: React.FC = () => {
  const { data, isPending } = useLoadTasks()
  const { mutateCreate } = useCreateTask()
  const { mutateDelete } = useDeleteTask()
  const { mutateToggleComplete } = useToggleCompleteTask()

  const [newValue, setNewValue] = useState('')

  const toggleComplete = useCallback(
    (task: Task) => {
      mutateToggleComplete.mutate(task)
    },
    [mutateToggleComplete]
  )

  const deleteTask = useCallback(
    (taskId: string) => {
      mutateDelete.mutate(taskId)
    },
    [mutateDelete]
  )

  const submitHandler = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      mutateCreate.mutate(
        newValue,
        { onSuccess: () => setNewValue('') }
      );
    },
    [mutateCreate, newValue]
  )

  return (
    <div>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          placeholder="Add a new task"
        />
        <button>Add Task</button>
      </form>
      {isPending
        ? '...loading'
        : (
          <div>
            {data && data.map((task) => (
              <div key={task.id}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleComplete(task)}
                  />
                {task.task}
                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </div>
            ))}
          </div>
        )
      }
    </div>
  );
}

export default App;