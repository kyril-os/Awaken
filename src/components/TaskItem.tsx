import { useState } from "react";
import type { task } from "../types";

import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { CheckIcon } from "@heroicons/react/16/solid";
import { XMarkIcon } from "@heroicons/react/16/solid";

type props = {
  // title: string;
  // description?: string;
  // dueDate?: Date | null;
  // priority: "high" | "medium" | "low";
  task: task;
  onDelete: Function;
  onComplete: Function;
}




const TaskItem = ({task, onDelete, onComplete}:props) => {


  const colors = {
    "high": "bg-red-500",
    "medium": "bg-yellow-500",
    "low": "bg-green-500"

  }

  const [showDesc, setShowDesc] = useState<boolean>(false)

  return(
    <>
      <div className="bg-gray-700 p-3 m-2 mb-4">
        <div className="flex items-center justify-between" >
          <div>
            <span className={`inline-block h-3 w-3 mr-2 rounded-full shadow shadow-black ${colors[task.priority]}`}/>
            <span className={`font-bold ml-1 decoration-4 decoration-black ${task.completed ? "line-through" : ""}`}>{task.title}</span>
          </div>
          <div className="flex">
            <div className="flex text-white">
              <XMarkIcon className="inline-block w-[22px] h-[22px] mr-1 ml-1 text-red-500 hover:cursor-pointer"
                onClick={() => onDelete(task.id)}
              />
              <CheckIcon className="inline-block w-5 h-5 mr-1 ml-1 text-green-500 hover:cursor-pointer"
                onClick={() => onComplete(task.id)}
              />

            </div>
            {task.description && 
            <div className="flex items-center">
              <div className="h-5 w-[1px] mr-2 ml-2 bg-gray-300"/>
              <ChevronDownIcon className="inline-block w-5 h-5 hover:cursor-pointer hover:scale-120" 
                onClick={() => setShowDesc(!showDesc)}/>
            </div>}
          </div>
        </div>
        {task.description &&
          (<div className={`${showDesc ? "flex" : "hidden"} mt-3`}>
            <hr />
            <p className="text-xs">{task.description}</p>
          </div>)
          }
      </div>
    </>
  )
}


export default TaskItem;