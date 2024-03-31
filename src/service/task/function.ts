import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { Task } from './type';

const tasksCollectionRef = collection(db, "tasks");

export const loadTasks = async () =>
  await getDocs(tasksCollectionRef)
    .then(res => res.docs.map(el => (
      {...el.data(), id: el.id} as Task
    )));

export const getTaskById = async (taskId: string) =>
  await getDoc(doc(db, "tasks", taskId)).then(res => (
    {...res.data(), id: res.id} as Task
  ));

export const createTask = async (newTask: string) =>
  await addDoc(tasksCollectionRef, { task: newTask, completed: false });

export const deleteTask = async (taskId: string) =>
  await deleteDoc(doc(db, "tasks", taskId));

export const toggleCompleteTask = async (task: Task) =>
  await updateDoc(doc(db, "tasks", task.id), { completed: !task.completed });