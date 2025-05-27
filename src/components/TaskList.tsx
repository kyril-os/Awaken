import { useState } from "react";
import type { task } from "../types";
import TaskItem from "./TaskItem";

type props = {
  tasks: task[];
  setTasks: React.Dispatch<Array<task>>;
}

const TasksList = ({tasks, setTasks}: props) => {


  const [completed, setCompleted] = useState<task[]>()

  const onComplete = (id: number) => {
    setCompleted([...tasks.filter(task => task.id == id)])
    setTasks([...tasks.map(task => task.id === id ? {...task, completed:true} : task)])
  }

  const onDelete = (id:number) => {
    setTasks(tasks.filter(tasks => tasks.id !== id))
  }


  return(
    <>
      {tasks.map(task =>
        <TaskItem
          key={task.id}
          task={task}
          onComplete={onComplete}
          onDelete={onDelete}
        />
      )}
    </>
  );
}


export default TasksList;