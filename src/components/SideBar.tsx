import { H1Icon } from "@heroicons/react/16/solid";
import { CalendarIcon, HomeIcon } from "@heroicons/react/24/solid";




const SideBar = () => {




  return(
    <div className="flex flex-col justify-start pt-8 items-center gap-8 h-full w-13 bg-[#1F2937] fixed top-0 left-0">
      <H1Icon className="h-10 w-10"/>
      <HomeIcon className="h-8 w-8"/>
      <CalendarIcon className="h-8 w-8"/>
      
    </div>
  )
}


export default SideBar;