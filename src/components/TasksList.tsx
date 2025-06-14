import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import type { List, Task } from "../types";
import TaskItem from "./TaskItem";
import React, { useEffect, useRef, useState } from "react";
import useStore from "../Store";
import * as Menu from '@radix-ui/react-dropdown-menu'
import { useDroppable } from "@dnd-kit/core";



type props = {
  list: List,
  isNewlyAdded: boolean,
  totalTasks: number,
}


const TaskList = ({list, isNewlyAdded, totalTasks}:props) => {


  const addTask = useStore(state => state.addTask)
  const deleteTask = useStore(state => state.deleteTask)

  const lastTask = list.tasks[list.tasks.length - 1]

  const taskToEdit = list.tasks.find(task => !task.title.trim());


  useEffect(() => {
    if(list.tasks.length < totalTasks){
      addTask(list.id, ''); 
    }
    // I don't Remember Why This Was Even Here, WTF was it Doing?
    // I do now remember the purpose of this, it was to resmove empty tasks when there are too many of them without reason
    else if(list.tasks.length > 8 && !list.tasks[list.tasks.length - 2].title.trim()){
      deleteTask(list.id, list.tasks[list.tasks.length - 2].id);
    }

    if(lastTask && lastTask.title.trim()){
      const newId = addTask(list.id, '');2
      setTimeout(() => setEditableTaskId(newId), 10)
      setTriggerEffect(prev => prev + 1);
    }
  }, [totalTasks, lastTask])



  const [editableTaskId, setEditableTaskId] = useState<number | null>(null)

  const [isBeingEdited, setIsBeingEdited] = useState<boolean>(false); // List
  const [title, setTitle] = useState<string>(list.title); // List
  const [hasBeenFocused, setHasBeenFocused] = useState<boolean>(false) // List

  const inputRef = useRef<HTMLInputElement>(null) // List Title

  useEffect(() => {
    if(!isNewlyAdded && list.tasks[0].id === -1){
      isNewlyAdded = true;
      deleteTask(list.id, -1)
    }
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


  const taskToEditInputRef = useRef<HTMLInputElement | null>(null);



  const handleAddTask = () => {
    setEditableTaskId(taskToEdit?.id ?? null);
    if(list.title.trim())
      taskToEditInputRef.current?.focus();
  }

  

  const [triggerEffect, setTriggerEffect] = useState<number>(0);

  useEffect(() => {
    if(triggerEffect !== 0)
      handleAddTask();
  },[triggerEffect])

  

  const handleCompleteAll = () => {
    updateList(list.id, {tasks: list.tasks.map(task => task.title.trim() ? ({...task, completed: true}) : task)});
  }

  const handleClearList = () => {
    updateList(list.id, {tasks: []})
  }

  const deleteList = useStore(state => state.deleteList)

  const handleDeleteList = () => {
    if(confirm())
      deleteList(list.id);
  }

  const menu = (
    <Menu.Root>
      <Menu.Trigger asChild >
        <button className="opacity-0 absolute group-hover:opacity-100 right-0 top-2 pointer-events-none group-hover:pointer-events-auto outline-0">
          <EllipsisVerticalIcon className="h-5 w-5  hover:cursor-pointer" strokeWidth={3} fill="#e0e0e0"/>
        </button>
      </Menu.Trigger>

      <Menu.Content
        className="z-10 min-w-[160px] rounded-md bg-[#1F2937] p-1 shadow-lg border border-neutral-700 outline-0"
        align="start"
        sideOffset={5}
        side='bottom'
      >
        <Menu.Item className="px-3 py-2 text-sm text-gray-200 hover:bg-white/8 rounded cursor-pointer outline-0"
          onSelect={() => setTimeout(() => handleAddTask())}
        >
          Add Task
        </Menu.Item>
        <Menu.Separator className="h-px bg-neutral-600 my-1" />
        <Menu.Item className="px-3 py-2 text-sm text-gray-200 hover:bg-white/8 rounded cursor-pointer outline-0"
          onSelect={handleCompleteAll}
        >
          Complete All
        </Menu.Item>
        <Menu.Separator className="h-px bg-neutral-600 my-1" />
        {/* Will Be Implemented Later On When There is a Saving and Loading System */}
        <Menu.Item className="px-3 py-2 text-sm text-gray-200 hover:bg-white/8 rounded cursor-pointer outline-0">
          Copy Tasks
        </Menu.Item>
        <Menu.Separator className="h-px bg-red-800/50 my-1" />
        <Menu.Item className="px-3 py-2 text-sm text-gray-200 hover:bg-white/8 rounded cursor-pointer outline-0"
          onSelect={handleClearList}
        >
          Clear List
        </Menu.Item>
        { list.id > 7 &&
        <>
          <Menu.Separator className="h-px bg-neutral-600 my-1" />
          <Menu.Item className="px-3 py-2 text-sm text-red-400 hover:bg-red-400/15 rounded cursor-pointer outline-0"
            onSelect={handleDeleteList}
          >
            Delete List
          </Menu.Item>
        </>
        }
      </Menu.Content>

    </Menu.Root>
  )


  const { setNodeRef } = useDroppable({
    id: list.id,
  })

  const isEmptyTask = (task: Task) => {
    if(task && (task.title || task.description || task.subtasks))
      return false;
    else return true;
  }
  
  
  // DID NOT WORK! FROZED MY BROWSER

  // useEffect(() => { // Put Empty Tasks at The End
  //   // You Can Switch This for a .sort() Method Altho I Really Don't Want to
  //   const length = list.tasks.length;
  //   let emptyPointer = 0;
  //   let filledPointer = 0;
  //   const newList =  [...list.tasks];

  //   let changed = false;
  //   while(emptyPointer < length - 1 && filledPointer < length){
  //     if(!isEmptyTask(newList[emptyPointer]))
  //       emptyPointer++;
  //     else{
  //       if(emptyPointer > filledPointer)
  //         filledPointer = emptyPointer + 1;
  //       while(isEmptyTask(newList[filledPointer]))
  //         filledPointer++;
  //       if (filledPointer < length){
  //         [newList[emptyPointer], newList[filledPointer]] = [newList[filledPointer], newList[emptyPointer]]; // Swap
  //         emptyPointer++;
  //         filledPointer++;
  //         changed = true;
  //       }
  //     }
  //   }
  //   if(changed)
  //     updateList(list.id, {tasks: newList})
  // }, [list.tasks.length])

  // REDO ON YOUR OWN LATER ON
  useEffect(() => {
    const newList = [...list.tasks];
    const sorted = newList.sort((a, b) => {
      const aEmpty = isEmptyTask(a);
      const bEmpty = isEmptyTask(b);
      return Number(aEmpty) - Number(bEmpty);
    });
  
    // Optional: Avoid unnecessary state update
    const changed = newList.some((task, i) => task.id !== list.tasks[i]?.id);
    if (changed) {
      updateList(list.id, { tasks: sorted });
    }
  }, [list.tasks]);
  

  return(
    <div className="relative flex flex-col gap-2 justify-center"
    >
      <div className="relative group flex flex-row items-center gap-1 justify-center">
        {isBeingEdited && list.id > 7 ? 
          <input value={title} className="flex-grow outline-none p-2 text-center max-h-8 text-2xl truncate font-bold min-w-0"
            ref={inputRef}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
          /> 
        : <>
            <div className={`flex-grow py-2 mx-7 truncate font-bold text-2xl justify-center flex items-center h-8 hover:cursor-default select-none`}
              onDoubleClick={() => setIsBeingEdited(true)}
            >
              {list.title.trim() === "" ? '\u200B' : list.title }
            </div>
            {menu}
          </>
        }
        
      </div>
      <hr />
      <div className="flex flex-col gap-1" ref={setNodeRef}>
        {list.tasks.map((task) => 
        <div key={task.id} className="flex flex-col gap-1 text-sm">
          <TaskItem task={task} listId={list.id}  handleAddTask={handleAddTask}
            editableTaskId={editableTaskId} setEditableTaskId={setEditableTaskId}  setTriggerEffect={setTriggerEffect}/>
          <hr className="opacity-30 h-[1px]"/>
        </div>)}
      </div>
    </div>
  )
}


export default TaskList;