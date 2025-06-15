import { DndContext, KeyboardSensor, MouseSensor, PointerSensor, TouchSensor, useSensor, useSensors, type DragEndEvent } from "@dnd-kit/core";
import ListsContainer from "./components/ListsContainer";
import SideBar from "./components/SideBar";
import useStore from "./Store";
import type { List } from "./types";


const App = () => {

  // const areDetailsVisible = useStore(state => state.selectedTaskDetailsId);

  const dailyLists = useStore(state => state.dailyLists)
  const customLists = useStore(state => state.customLists)


  const updateList = useStore(state => state.updateList);

  const findSource = (taskId: number) => {
    let sourceContainer: List[] | undefined;
    let sourceListId: number | undefined;
    const dailyList = dailyLists.find(list => list.tasks.find(task => task.id === taskId));
    const customList = customLists.find(list => list.tasks.find(task => task.id === taskId));
      if(dailyList){
        sourceContainer = dailyLists;
        sourceListId = dailyList.id;
      }
      else if(customList){
        sourceContainer = customLists;
        sourceListId = customList.id
      }

    return {sourceContainer, sourceListId};
  }

  const handleDragEnd = (Event: DragEndEvent) => {
    const {active, over} = Event;

    if(!over) return;2

    const taskId = active.id as number;
    const destinationListId = over.id as number;
    
    const {sourceContainer, sourceListId} = findSource(taskId);
    const sourceList = sourceContainer?.find(list => list.id === sourceListId);
    const destinationContainer = destinationListId > 7 ? customLists : dailyLists;
    const destinationList = destinationContainer.find(list => list.id === destinationListId);

    // if return;

    const task = sourceList?.tasks.find(task => task.id === taskId);

    if(sourceContainer && sourceListId && sourceList !== destinationList){
      updateList(destinationListId, {tasks: [...destinationList!.tasks, task!]});
      updateList(sourceListId, {tasks: [...sourceList!.tasks.filter(task => task.id !== taskId)]});
    }

  }

  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 0.01
    }
  })
  const mouseSensor = useSensor(MouseSensor)
  const touchSensor = useSensor(TouchSensor)

  const sensors = useSensors(
    mouseSensor,
    touchSensor,
    pointerSensor
  )

  // const sensors = useSensors(
  //   useSensor(PointerSensor, {
  //     activationConstraint: {
  //       distance: 5,
  //       delay: 150,
  //     }
  //   })
  // )


  return(
    <div className={`w-full h-full pl-15 pr-2 bg-[#1A1F29] text-[#E0E0E0] selection:bg-neutral-600 ${/*areDetailsVisible ? "" :*/ ""}`}>
      <SideBar />
      <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
        <ListsContainer container={dailyLists}/>
        <ListsContainer container={customLists}/>
      </DndContext>
    </div>
  )

}



export default App;