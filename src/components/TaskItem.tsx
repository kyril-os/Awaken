import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import type { Task } from "../types";
import { XMarkIcon } from "@heroicons/react/24/solid";
import useStore  from "../Store";
import { useState } from "react";
import { parseAst } from "vite";




type props = {
  listId: number,
  task: Task,
}


const TaskItem = ({task, listId}:props) => {


  const [title, setTitle] = useState<string>(task.title)

  const deleteTask = useStore(state => state.deleteTask);
  const updateTask = useStore(state => state.updateTask);

  const [isEditing, setIsEditing] = useState<boolean>(false);


  const handleDelete = () => {
    deleteTask(listId, task.id)
  }

  const handleComplete = () => {
    updateTask(listId, task.id, {completed: !task.completed})
  }


  const colors = {
    "high": "bg-red-500",
    "medium": "bg-yellow-500",
    "low": "bg-green-500",
  }





  return(
    <div className={`group flex items-center gap-2 w-full px-2 ${task.completed ? "line-through" : ""} hover:bg-[#ffffff10]`} >
      <span className={`h-3 w-3 rounded-full flex-shrink-0 ${colors[task.priority]}`} />
      {/* { onEditing ?
        <input className="flex-grow outline-none max-w-[70%]" value={title} 
        onChange={(e) => {
          setTitle(e.target.value)
          updateTask(listId, task.id, {title: e.target.value})
        }}/>
        : */}
      <span className="flex-grow outline-none" contentEditable={isEditing}
        onDoubleClick={() => setIsEditing(true)}
        onBlur={() => updateTask(listId, task.id, { title })}
        onKeyDown={(e) => {if(e.key === "Enter"){
          e.preventDefault()
          updateTask(listId, task.id, { title })
        }}} 
        onClick={() => handleComplete()}
      >{task.title}</span>
      {/* } */}
      <span className="flex-shrink-0 hidden group-hover:flex justify-evenly gap-1 ">
        <EllipsisHorizontalIcon className="w-5 h-5 hover:cursor-pointer"/>
        <XMarkIcon onClick={handleDelete} 
          className="w-[18px] h-[18px] hover:cursor-pointer hover:text-red-400"/> 
      </span>
    </div>
  )

}


export default TaskItem;