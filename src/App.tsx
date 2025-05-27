import { useState } from 'react'
import type { task } from './types';
import TasksList from './components/TaskList';



function App(){

  const [tasks, setTasks] = useState<task[]>([
    {
      id: 1,
      title: "Test",
      description: "This is a test to see if anything is working",
      createdAt: new Date(),
      completed: true,
      priority: "low",
      dueDate: null,
      updatedAt: null
    },
    {
      id: 2,
      title: "Test",
      description: "This is a test to see if anything is working",
      createdAt: new Date(),
      completed: false,
      priority: "high",
      dueDate: null,
      updatedAt: null
    },
    {
      id: 3,
      title: "Test",
      description: "This is a test to see if anything is working",
      createdAt: new Date(),
      completed: false,
      priority: "medium",
      dueDate: null,
      updatedAt: null
    },
    {
      id: 4,
      title: "Test",
      description: "This is a test to see if anything is working",
      createdAt: new Date(),
      completed: false,
      priority: "high",
      dueDate: null,
      updatedAt: null
    },
    {
      id: 5,
      title: "Test",
      description: "This is a test to see if anything is working",
      createdAt: new Date(),
      completed: false,
      priority: "high",
      dueDate: null,
      updatedAt: null
    },
  ]);





  return(
    <>
      <TasksList 
        tasks={tasks}
        setTasks={setTasks}
      />
    </>
  )
}

export default App;