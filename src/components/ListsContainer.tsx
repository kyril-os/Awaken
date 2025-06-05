import { PlusIcon } from "@heroicons/react/24/solid";
import type { List } from "../types"
import TasksList from "./TasksList";
import useStore from "../Store";
// import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";



const ListsContainer = ({container}:{container: List[]}) => {

  const addList = useStore(state => state.addList)

  const handleAddList = () => {
    addList("");
  }

  return(
    <div className="pl-1 flex flex-1 gap-5 py-4 w-full h-1/2 justify-start overflow-x-scroll">
      {container
        .filter(list => list !== null)
        .map((list) => 
          <div className="min-w-70" key={list.id}>
            <TasksList list={list}/>
          </div>
        )
      }
      {container.some(list => list.id == 1) ?
        null :
        <div className="flex flex-col gap-2 min-w-70">
          <div className="flex flex-col relative font-bold text-2xl items-center justify-center">
            Add List
            {/* <EllipsisVerticalIcon className="drop-shadow-[] absolute h-5 w-5 right-0 hover:cursor-pointer"/> */}
          </div>
          <hr />
          <div className="flex justify-center items-center h-full hover:cursor-pointer hover:bg-[#ffffff20]"
            onClick={handleAddList}
          >
            <PlusIcon className="opacity-80 h-25"/>
          </div>
        </div>
      }
    </div>
  )
}


export default ListsContainer;