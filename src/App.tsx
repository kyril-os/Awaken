import { useContext, useEffect, useState } from 'react'
import type { prioritype, task } from './types';
import TasksList from './components/TaskList';
import TaskForm from './components/TaskForm';
import Notification from './components/Notification'
import NotificationContext from './context/NotificationContext';


function App(){

  const [tasks, setTasks] = useState<task[]>(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });


  const { notify } = useContext(NotificationContext);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks])

  const addTask = (title: string, desc: string = '', dueDate: Date | null, priority: prioritype = "medium") => {
    const newTask: task = {
      id: new Date().getTime(),
      title: title,
      description: desc ? desc : '',
      createdAt: new Date(),
      completed: false,
      priority: priority,
      dueDate: dueDate,
      updatedAt: null,
    } 
    setTasks([...tasks, newTask]);
    notify('complete', 'Task Added Successfully', 'top-right', 'check');

  }


  return(
    <>
      <Notification 
        // type="delete"
        // message="Undo Delete?"
        // position='buttom'
      />
      <TaskForm 
        addTask={addTask}
      />
      <TasksList 
        tasks={tasks}
        setTasks={setTasks}
      />
    </>
  )
}

export default App;