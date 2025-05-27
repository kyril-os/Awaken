import { useState } from "react";
import { PlusIcon } from "@heroicons/react/20/solid";
import type { prioritype } from "../types";



const TaskForm = ({addTask}: {addTask: Function}) => {

  const [showForm, setShowForm] = useState(false);

  const [title, setTitle] = useState<string>('');
  const [desc, setDesc] = useState<string>('');
  const [priority, setPriority] = useState<prioritype>("low");
  const [dueDate, setDueDate] = useState<Date>();

  const resetForm = () => {
    setTitle('');
    setDesc('');
    setPriority('low');
    setDueDate(undefined);
  }



  return(
    <>
      <button className="flex bg-sky-500 p-1 m-3 ml-5 hover:shadow-lg shadow hover:cursor-pointer hover:bg-sky-600"
        onClick={() => setShowForm(true)}
      >
        <PlusIcon className="h4 w-4 mr-1"/>
        <span>Add Task</span>
      </button>
       
      {showForm && 
      <form 
        className="flex fixed flex-col gap-11 items-center bg-gray-700 w-[90%] p-5 pt-15 pb-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-black drop-shadow-2xl dropshadow-white rounded-2xl"
        onSubmit={(e) => {
          e.preventDefault();
          addTask(title, desc, dueDate, priority);
          setShowForm(false);
          resetForm();
        }}
      >
        <div className="flex h-9 w-[90%] justify-between items-center">
          <label htmlFor="title">Title: </label>
          <input value={title} onChange={e => setTitle(e.target.value)} id="title" name="title" type="text" className="w-[80%] bg-gray-900 rounded-2xl p-1 px-5 focus:border-white focus:ring-0 focus:outline-none" required></input>
        </div>
        <div className="flex h-9 w-[90%] justify-between items-center">
          <label htmlFor="desc">Description: </label>
          <textarea value={desc} onChange={e => setDesc(e.target.value)} rows={3} id="desc" name="desc" className="w-[80%] bg-gray-900 rounded-2xl p-1.5 px-5 overflow-scroll focus:border-white focus:ring-0 focus:outline-none  resize-none"></textarea>
        </div>
        <div className="flex h-9 w-[90%] justify-between items-center gap-8">
          <div className="flex h-9 w-[50%] justify-between items-center">
            <label htmlFor="dueDate">Due Date: </label>
            <input value={dueDate ? dueDate.toISOString().split('T')[0] : ''} onChange={e => setDueDate(new Date(e.target.value))} type="date" name="dueDate" className="w-[70%] bg-gray-900 rounded-2xl text-center p-1 px-2 focus:border-white focus:border focus:ring-0 focus:outline-none"/>
          </div>
          <div className="flex h-9 w-[50%] justify-between items-center">
            <label htmlFor="priority">Priority: </label>
            <select id="priority" name="priority" className="w-[60%] bg-gray-900 rounded-2xl p-1 px-4" value={priority} onChange={e => setPriority(e.target.value as prioritype)}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
        <div className="flex h-9 w-[90%] justify-center items-center gap-5">
          <button type="reset" className="flex bg-rose-500 p-1 px-3 hover:shadow-lg shadow hover:cursor-pointer hover:bg-rose-600 rounded-2xl">Reset</button>
          <button type="submit" className="flex bg-sky-500 p-1 px-3 hover:shadow-lg shadow hover:cursor-pointer hover:bg-sky-600 rounded-2xl">Add Task</button>
        </div>
      </form>}
    </>
  )
}



export default TaskForm;