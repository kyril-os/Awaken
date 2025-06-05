import { H1Icon } from "@heroicons/react/16/solid";
import { CalendarIcon, ChartBarIcon, Cog8ToothIcon, HomeIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";




const SideBar = () => {

  // const [isFormVisible, setIsFormVisible] = useState(false)

  // const handleAddList = () => {

  // }

  return(
    <div className="flex flex-col justify-between pt-5 pb-4 items-center h-full w-13 bg-[#1F2937] fixed top-0 left-0">
      <div className="flex flex-col justify-between gap-6 items-center">
        <H1Icon className="h-10 w-10"/>
        <ChartBarIcon className="h-7 w-7 hover:cursor-pointer"/>
        <HomeIcon className="h-7 w-7 hover:cursor-pointer"/>
        <CalendarIcon className="h-7 w-7 hover:cursor-pointer"/>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
          className="size-[30px] hover:cursor-pointer"
          // onClick={handleAddList}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
          <path strokeLinecap="round" strokeWidth={3} strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" className="scale-40 translate-x-[7px] translate-y-[8px]"/>
        </svg>

      </div>
      <div className="flex flex-col justify-between gap-6 items-center">
        <Cog8ToothIcon className="h-7 w-7 hover:cursor-pointer" />
        <InformationCircleIcon className="h-7 w-7 hover:cursor-pointer"/>
      </div>
    </div>
  )
}


export default SideBar;
