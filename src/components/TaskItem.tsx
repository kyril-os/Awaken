import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import type { Task } from "../types";
import { XMarkIcon } from "@heroicons/react/24/solid";
import useStore  from "../Store";
import React, { useState } from "react";
import TaskDetails from "./TaskDetails";




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
    if(task.title)
      updateTask(listId, task.id, {completed: !task.completed})
  }

  const handleSave = () => {
    updateTask(listId, task.id, {title: title})
    setIsEditing(false);
  }

  const handleKeyDown = (e:React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSave();
    }
    else if (e.key === "Escape") {
      setTitle(task.title);
      setIsEditing(false);
    }
  }


  const colors = {
    "high": "bg-red-500",
    "medium": "bg-yellow-500",
    "low": "bg-green-500",
    "undefined": "transparent"
  }

  const selectedTaskDetailsId = useStore((state) => state.selectedTaskDetailsId)
  const setSelectedTaskDetailsId = useStore((state) => state.setSelectedTaskDetailsId)


  return(
    <>
      {task.id === selectedTaskDetailsId &&
        <TaskDetails task={task} listId={listId}
        />
      }
      <div onDoubleClick={(e) => {
              e.stopPropagation();
              setIsEditing(true);
          }}
        className={`group flex items-center gap-2 w-full px-2 ${task.completed ? "line-through" : ""} hover:bg-[#ffffff10]`} >
        <span className={`h-3 w-3 rounded-full flex-shrink-0 ${colors[task.priority]} ${task.title? "border-[1px] border-[#ffffff50]" : ""}`} />
        {isEditing ? 
          <input className="flex-grow outline-none bg-transparent border-none truncate" value={title}
            autoFocus 
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            />
          :
          <span className="flex-grow outline-none truncate"
            onClick={handleComplete}
          >
            {task.title.trim() === "" ? '\u200B' : task.title}
          </span>
        }
        <span className="flex-shrink-0 hidden group-hover:flex justify-evenly gap-1 ">
          <EllipsisHorizontalIcon className="w-5 h-5 hover:cursor-pointer"
            onClick={() => setSelectedTaskDetailsId(task.id)}
          />
          <XMarkIcon onClick={handleDelete} 
            className="w-[18px] h-[18px] hover:cursor-pointer hover:text-red-400"/> 
        </span>
      </div>
    </>
  )

}


export default TaskItem;