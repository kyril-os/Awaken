import { useContext, useState } from 'react'
import type { prioritype, task } from './types';
import TasksList from './components/TaskList';
import TaskForm from './components/TaskForm';
import Notification from './components/Notification'
import NotificationContext from './context/NotificationContext';


function App(){

  const [tasks, setTasks] = useState<task[]>([
    {
      id: new Date().getTime(),
      title: "Test",
      description: "This is a test to see if anything is working",
      createdAt: new Date(2025, 2, 14),
      completed: true,
      priority: "low",
      dueDate: null,
      updatedAt: null
    },
    {
      id: new Date(2025, 1, 15).getTime(),
      title: "Test",
      description: "This is a test to see if anything is working",
      createdAt: new Date(),
      completed: false,
      priority: "high",
      dueDate: null,
      updatedAt: null
    },
    {
      id: new Date(2021, 12, 23).getTime(),
      title: "Test",
      description: "This is a test to see if anything is working",
      createdAt: new Date(),
      completed: false,
      priority: "medium",
      dueDate: null,
      updatedAt: null
    },
    {
      id: new Date(2023, 5, 23).getTime(),
      title: "Test",
      description: "This is a test to see if anything is working",
      createdAt: new Date(),
      completed: false,
      priority: "high",
      dueDate: null,
      updatedAt: null
    },

  ]);


  const { notify } = useContext(NotificationContext);

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