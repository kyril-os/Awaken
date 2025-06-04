import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import type { List } from "../types";
import TaskItem from "./TaskItem";



type props = {
  list: List,
}


const TaskList = ({list}:props) => {





  return(
    <div className="flex flex-col gap-2">
      <div className="flex flex-col relative font-bold text-2xl items-center justify-center">
        {list.title}
        
        <EllipsisVerticalIcon className="drop-shadow-[] absolute h-5 w-5 right-0 hover:cursor-pointer"/>
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