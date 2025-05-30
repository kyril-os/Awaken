import React, { useContext, useState } from "react";
import type { task } from "../types";
import TaskItem from "./TaskItem";
import NotificationContext from "../context/NotificationContext";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Collapsible from "./Collapsible";

type props = {
  tasks: task[];
  setTasks: React.Dispatch<React.SetStateAction<task[]>>;
}

const TasksList = ({tasks, setTasks}: props) => {

  const { notify } = useContext(NotificationContext);

  const [completedTasks, setCompletedTasks] = useState<task[]>([])

  const onComplete = (id: number, isCompleted: boolean) => {
    if(!isCompleted){
      setCompletedTasks([...tasks.filter(task => task.id === id)])
      setTasks([...tasks.map(task => task.id === id ? {...task, completed:true} : task)])
      notify("complete", "Task Completed", "top-right", "check")
    }
    else{
      setCompletedTasks(completedTasks.filter(task => task.id !== id));
      setTasks([...tasks.map(task => task.id === id ? {...task, completed: false} : task)])
      notify("complete", "Task 'Un-Completed'", "top-right", "xmark")
    }
  }

  // const [lastDeleted, setLastDeleted] = useState<task>();


  const onDelete = (id: number) => {
    const taskToDelete: task | undefined =  tasks.find(task => task.id === id);
    
    if(!taskToDelete) return;

    setTasks(tasks.filter(task => task.id !== id))

    notify('delete', "Undo Delete?", "buttom", "none", 
      () => {
        setTasks((currentTasks: task[]) => [...currentTasks, taskToDelete!]);
      },
      () => {
        notify('complete', 'Task Deleted Successfully', 'top-right', 'xmark')
      }
    );
  }

  const [showCompleted, setShowCompleted] = useState<boolean>(true);
  const [showActive, setShowActive] = useState<boolean>(true);

  return(
    <>
      <div  className="flex gap-2 font-semibold hover:cursor-pointer"
        onClick={() => setShowActive(!showActive)}
      >
        <ChevronDownIcon className="h-6 w-6"/>
        <span>Active</span>
      </div>
      <Collapsible isOpen={showActive}>
        {tasks.map(task => !task.completed?
          <TaskItem
            key={task.id}
            task={task}
            onComplete={onComplete}
            onDelete={onDelete}
          />
          : null
        )}
      </Collapsible>
      <div className="flex gap-2 font-semibold hover:cursor-pointer"
        onClick={() => setShowCompleted(!showCompleted)}
      >
        <ChevronDownIcon className="h-6 w-6"/>
        <span>Completed</span>
      </div>
      <Collapsible isOpen={showCompleted}>
        {tasks.map(task => task.completed?
          <TaskItem
            key={task.id}
            task={task}
            onComplete={onComplete}
            onDelete={onDelete}
          />
          : null
        )}
      </Collapsible>
    </>
  )
}


export default TasksList;