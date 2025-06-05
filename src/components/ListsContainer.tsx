import type { List } from "../types"
import TasksList from "./TasksList";




const ListsContainer = ({container}:{container: List[]}) => {

  return(
    <div className="pl-1 flex flex-1 gap-5 py-4 w-full h-1/2 justify-evenly max-h-max overflow-x-scroll">
      {container.map((list) => 
        <div className="min-w-70" key={list.id}>
          <TasksList list={list}/>
        </div>
      )}
    </div>
  )
}


export default ListsContainer;