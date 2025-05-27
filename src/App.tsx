import { useState } from 'react'
import type { prioritype, task } from './types';
import TasksList from './components/TaskList';
import TaskForm from './components/TaskForm';



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
  }



  return(
    <>
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