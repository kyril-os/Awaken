import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import type { List } from "../types";
import TaskItem from "./TaskItem";
import React, { useEffect, useRef, useState } from "react";
import useStore from "../Store";



type props = {
  list: List,
  isNewlyAdded: boolean
}


const TaskList = ({list, isNewlyAdded}:props) => {

  const addTask = useStore(state => state.addTask)
  const minTasks = 8;

  useEffect(() => {
    if(list.tasks.length < minTasks)
      addTask(list.id, '');
  }, [list.tasks.length])


  const [isBeingEdited, setIsBeingEdited] = useState(false);


  const [title, setTitle] = useState(list.title);
  const [hasBeenFocused, setHasBeenFocused] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if(inputRef && isNewlyAdded && !list.title && !hasBeenFocused)
      setIsBeingEdited(true);
      inputRef.current?.focus();
      setHasBeenFocused(true);
  }, [inputRef, isBeingEdited])

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
    <div className="flex flex-col gap-2 justify-center">
      <div className="flex flex-row items-center gap-2 justify-center">
        {isBeingEdited && list.id > 7 ? 
          <input value={title} className="flex-grow outline-none p-2 text-center max-h-8 text-2xl truncate font-bold min-w-0"
            ref={inputRef}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
          /> 
        : 
          <div className={`group flex-grow p-2 truncate font-bold text-2xl justify-center flex mx-2 items-center h-8 hover:cursor-default select-none`}
            onDoubleClick={() => setIsBeingEdited(true)}
          >
            {list.title.trim() === "" ? '\u200B' : list.title }
          </div>
        }
        <EllipsisVerticalIcon className="flex-shrink-0 group-hover:block h-5 w-5  hover:cursor-pointer" strokeWidth={3} fill="#e0e0e0"/>
        
      </div>
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