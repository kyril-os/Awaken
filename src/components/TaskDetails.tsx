import { CalendarDateRangeIcon, PlusIcon, XMarkIcon, TrashIcon } from "@heroicons/react/24/outline";
import { type Task } from "../types";
import useStore from "../Store";
import React, { useState, useEffect } from "react";


type props = {
  task: Task;
  listId: number;
}




const TaskDetails = ({task, listId}:props) => {


  const setSelectedTaskDetailsId = useStore((state) => state.setSelectedTaskDetailsId)
  const updateTask = useStore((state) => state.updateTask);

  const [tempTask, setTempTask] = useState<Task>(task)


  const saveTask = () => {
    updateTask(listId, task.id, tempTask);
    setSelectedTaskDetailsId(null);
  }

  const discardTask = () => {
    setTempTask(task);
    setSelectedTaskDetailsId(null);
  }


  useEffect(() => {
    const handleKeyDown = (e:KeyboardEvent) => {
      if (e.key === "Enter" && e.ctrlKey){
        e.preventDefault()
        saveTask();
      }
      else if (e.key === "Escape")
        discardTask();
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  },[tempTask])

  const updateSubTask = (key: "title" | "completed", value: string | boolean, id:number) => {
    setTempTask(current => ({...current,
      subtasks: current.subtasks?.map(subtask => subtask.id === id ?
        {...subtask, [key]: value }
        :
        subtask
    )}))
  }

  const [newSubTaskTitle, setNewSubTaskTitle] = useState<string>('');

  const addSubTask = (e:React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === "Enter" && (e.target as HTMLInputElement).value.trim()){
      setTempTask(current => ({...current,
        subtasks: [...(current.subtasks || []), 
          {
            id: Math.floor(Math.random() * 10000),
            completed: false,
            title: (e.target as HTMLInputElement).value,
          }
        ]
      }))
      setNewSubTaskTitle('');
    }
  }

  const deleteSubtask = (id: number) => {
    setTempTask(current => ({...current, subtasks: current.subtasks?.filter(subtask => subtask.id !== id)}))
  }


  const taskDetailsVisible = useStore(state => state.selectedTaskDetailsId)

  return(
    <>
      <div className="ml-7 min-w-60 max-w-200 max-h-[80%] fixed w-[60%] p-4 top-1/2 left-1/2 -translate-1/2 bg-[#1F2937] z-20 rounded-2xl"
        // onBlur={onBlur}
        // onKeyDown={handleKeyDown}
      >
        {/* The Upper Part Icons and Stuff */}
        <div className="flex w-full h-[10%] px-2 justify-between items-center">
          <div className="flex items-center gap-2 flex-grow"><span className="font-bold">Updated At:</span><span className="flex items-center gap-1"><CalendarDateRangeIcon className="h-4 w-4"/> {task.updatedAt.toString().split('T')[0]}</span></div>
          <div className="flex flex-col gap-3 h-full items-center justify-center">
            <XMarkIcon className="h-5.5 w-5.5 hover:cursor-pointer hover:bg-[#ffffff20] p-0.5"
              onClick={saveTask}
            />
          </div>
        </div>
        <hr className="bg-white w-full mt-3 mb-5 h-[1px] opacity-60"/>
        {/* Task Title and Notes */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center px-4 gap-4 font-semibold">
            <input type="checkbox" checked={tempTask.completed}
              onChange={() => setTempTask(current => ({...current, completed:!current.completed}))}
              className="flex items-center justify-center h-5 w-5 appearance-none border border-gray-500 bg-transparent rounded checked:after:content-['✓'] checked:after:text-white checked:after:block checked:after:text-center"
            />
            <input className="w-full text-xl outline-0" value={tempTask.title}
              onChange={(e) => setTempTask(curernt => ({...curernt, title: e.target.value}))}
            />          
          </div>
          <textarea className=" min-h-3 bg-transparent mr-4 ml-12 px-3 resize-none overflow-auto2 outline-0" placeholder="Notes" rows={3}
            value={tempTask.description}
            onChange={(e) => setTempTask(current => ({...current, description: e.target.value}))}
          />
        </div>
        <hr className="mx-4 h-[1px] opacity-30 mb-3" />
        {/* SubTasks */}
        <div className="flex flex-col overflow-auto max-h-60">
          {tempTask.subtasks &&
            tempTask.subtasks.map(subtask => 
            <div key={subtask.id}>
              <div className="group relative flex gap-3 ml-10 mr-4 items-center">
                <input type="checkbox" checked={subtask.completed}
                  onChange={(e) => updateSubTask("completed", e.target.checked, subtask.id)}
                  className="flex items-center justify-center h-5 w-5 appearance-none border border-gray-500 bg-transparent rounded checked:after:content-['✓'] checked:after:text-white checked:after:block checked:after:text-center shrink-0"
                />
                <input className="w-full outline-0" value={subtask.title}
                  onChange={(e) => updateSubTask("title", e.target.value, subtask.id)}
                />
                <TrashIcon className="hidden h-5 w-5 group-hover:block mr-3 hover:cursor-pointer"
                  onClick={() => deleteSubtask(subtask.id)}
                />
              </div>
              <hr className="opacity-10 mx-8 my-2"/>
            </div>
            )
          }
          <div
              className={`flex gap-3 ml-10 mr-4 items-center ${task}`}
            >
            <PlusIcon className="flex items-center tx justify-center h-5 w-5 p-[1px] appearance-none border-[#E0E0E0cc] border-[1px] bg-transparent rounded checked:after:content-['✓'] checked:after:text-white checked:after:block checked:after:text-center" strokeWidth={3}

            />
            <input className="w-full outline-0" placeholder="Add Task"
              value={newSubTaskTitle}
              onChange={(e) => setNewSubTaskTitle(e.target.value)}
              onKeyDown={addSubTask}
            />
          </div>
        </div>
      </div>
      {/* Blur Overlay */}
      { taskDetailsVisible &&
        < div className="fixed z-10 top-0 left-0 backdrop-blur-xs bg-black/20 w-screen h-screen"
          onClick={saveTask}
        />
      }
    </>
  )
}


export default TaskDetails;