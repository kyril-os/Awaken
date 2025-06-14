import ListsContainer from "./components/ListsContainer";
import SideBar from "./components/SideBar";
import useStore from "./Store";


const App = () => {

  // const areDetailsVisible = useStore(state => state.selectedTaskDetailsId);

  const dailyLists = useStore(state => state.dailyLists)
  const customLists = useStore(state => state.customLists)


  return(
    <div className={`w-full h-full pl-15 pr-2 bg-[#1A1F29] text-[#E0E0E0] selection:bg-neutral-600 ${/*areDetailsVisible ? "" :*/ ""}`}>
      <SideBar />
      <ListsContainer container={dailyLists}/>
      <ListsContainer container={customLists}/>
    </div>
  )

}



export default App;