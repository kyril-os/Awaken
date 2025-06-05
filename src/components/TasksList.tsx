import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import type { List } from "../types";
import TaskItem from "./TaskItem";
import React, { useEffect, useState } from "react";
import useStore from "../Store";



type props = {
  list: List,
}


const TaskList = ({list}:props) => {

  const addTask = useStore(state => state.addTask)
  const minTasks = 8;

  useEffect(() => {
    if(list.tasks.length < minTasks)
      addTask(list.id, '');
  }, [list.tasks.length])


  const [isBeingEdited, setIsBeingEdited] = useState(false);
  const [title, setTitle] = useState(list.title);

  const updateList = useStore(state => state.updateList);

  const handleSave = () => {
    updateList(list.id, {title: title})
    setIsBeingEdited(false);
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === "Enter"){
      e.preventDefault();
      handleSave();
    }
    else if (e.key === "Escape"){
      setTitle(list.title);
      setIsBeingEdited(false);
    }
  }

  return(
    <div className="flex flex-col gap-2">
      {isBeingEdited && list.id > 7 ?
        <input value={title} className="outline-none p-2 text-center max-h-8 h-full text-2xl truncate font-bold min-w-0"
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
        /> 
      : 
        <div className={`group flex flex-col relative truncate font-bold text-2xl items-center justify-center h-8 ${list.id < 7 ? "hover:cursor-default select-none" : "hover:cursor-text"}`}
          onDoubleClick={() => setIsBeingEdited(true)}
        >
          {list.title}
          <EllipsisVerticalIcon className="hidden group-hover:block drop-shadow-[] absolute h-5 w-5 right-0 hover:cursor-pointer" strokeWidth={3} fill="#e0e0e0"/>
        </div>
      }
      <hr />
      <div className="flex flex-col gap-1">
        {list.tasks.map((task) => 
        <div key={task.id} className="flex flex-col gap-1 ">
          <TaskItem task={task} listId={list.id}/>
          <hr className="opacity-30"/>
        </div>)}
      </div>
    </div>
  )
}


export default TaskList;