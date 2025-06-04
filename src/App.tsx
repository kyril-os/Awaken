import ListsContainer from "./components/ListsContainer";
import SideBar from "./components/SideBar";
// import type { List } from "./types";
import useStore from "./Store";


// const container: List[] = [
//   {
//     id: 1,
//     title: "Work Tasks",
//     date: new Date(),
//     tasks: [
//       {
//         id: 101,
//         title: "Complete project proposal",
//         description: "Finalize and submit proposal for client review.",
//         completed: false,
//         priority: "high",
//         updatedAt: new Date(),
//         subtasks: [
//           { id: 1001, title: "Research competitors", completed: true },
//           { id: 1002, title: "Draft initial outline", completed: false },
//           { id: 1003, title: "Get feedback", completed: false }
//         ]
//       },
//       {
//         id: 102,
//         title: "Team Meeting",
//         description: "Weekly sync-up with the engineering team.",
//         completed: true,
//         priority: "medium",
//         updatedAt: new Date(),
//       }
//     ]
//   },
//   {
//     id: 2,
//     title: "Personal Goals",
//     date: new Date(),
//     tasks: [
//       {
//         id: 201,
//         title: "Workout",
//         description: "Morning gym session—focus on strength training.",
//         completed: false,
//         priority: "low",
//         updatedAt: new Date(),
//         subtasks: [
//           { id: 2001, title: "Warm-up", completed: true },
//           { id: 2002, title: "Cardio", completed: false },
//           { id: 2003, title: "Weight lifting", completed: false }
//         ]
//       },
//       {
//         id: 202,
//         title: "Read Book",
//         description: "Read at least 20 pages of a new book.",
//         completed: true,
//         priority: "medium",
//         updatedAt: new Date(),
//       }
//     ]
//   }
// ];


// const weekContainer: List[] = [
//   {
//     id: 1,
//     title: "Monday",
//     date: new Date(),
//     tasks: [
//       {
//         id: 101,
//         title: "Review PRs",
//         completed: false,
//         priority: "medium",
//         updatedAt: new Date(),
//         subtasks: [
//           { id: 1001, title: "Frontend PR", completed: false },
//           { id: 1002, title: "Backend PR", completed: true }
//         ]
//       }
//     ]
//   },
//   {
//     id: 2,
//     title: "Tuesday",
//     date: new Date(),
//     tasks: [
//       {
//         id: 201,
//         title: "Write unit tests",
//         completed: true,
//         priority: "high",
//         updatedAt: new Date()
//       }
//     ]
//   },
//   {
//     id: 3,
//     title: "Wednesday",
//     date: new Date(),
//     tasks: [
//       {
//         id: 301,
//         title: "Design meeting",
//         description: "Discuss new UI flow",
//         completed: false,
//         priority: "low",
//         updatedAt: new Date()
//       },
//       {
//         id: 302,
//         title: "Refactor styles",
//         completed: false,
//         priority: "medium",
//         updatedAt: new Date()
//       }
//     ]
//   },
//   {
//     id: 4,
//     title: "Thursday",
//     date: new Date(),
//     tasks: []
//   },
//   {
//     id: 5,
//     title: "Friday",
//     date: new Date(),
//     tasks: [
//       {
//         id: 501,
//         title: "Deploy update",
//         completed: true,
//         priority: "high",
//         updatedAt: new Date()
//       },
//       {
//         id: 151,
//         title: "Review PRs",
//         completed: false,
//         priority: "medium",
//         updatedAt: new Date(),
//         subtasks: [
//           { id: 1001, title: "Frontend PR", completed: false },
//           { id: 1002, title: "Backend PR", completed: true }
//         ]
//       },
//       {
//         id: 141,
//         title: "Review PRs",
//         completed: false,
//         priority: "medium",
//         updatedAt: new Date(),
//         subtasks: [
//           { id: 1001, title: "Frontend PR", completed: false },
//           { id: 1002, title: "Backend PR", completed: true }
//         ]
//       },{
//         id: 131,
//         title: "Review PRs",
//         completed: false,
//         priority: "medium",
//         updatedAt: new Date(),
//         subtasks: [
//           { id: 1001, title: "Frontend PR", completed: false },
//           { id: 1002, title: "Backend PR", completed: true }
//         ]
//       },{
//         id: 121,
//         title: "Review PRs",
//         completed: false,
//         priority: "medium",
//         updatedAt: new Date(),
//         subtasks: [
//           { id: 1001, title: "Frontend PR", completed: false },
//           { id: 1002, title: "Backend PR", completed: true }
//         ]
//       }
//     ]
//   },
//   {
//     id: 6,
//     title: "Saturday",
//     date: new Date(),
//     tasks: [
//       {
//         id: 601,
//         title: "Go hiking",
//         completed: false,
//         priority: "low",
//         updatedAt: new Date(),
//         subtasks: [
//           { id: 6001, title: "Pack gear", completed: true },
//           { id: 6002, title: "Drive to trailhead", completed: false }
//         ]
//       }
//     ]
//   },
//   {
//     id: 7,
//     title: "Sunday",
//     date: new Date(),
//     tasks: [
//       {
//         id: 701,
//         title: "Weekly review",
//         description: "Journal and plan next week",
//         completed: false,
//         priority: "medium",
//         updatedAt: new Date()
//       }
//     ]
//   }
// ];


const App = () => {

  const dailyLists = useStore(state => state.dailyLists)
  const customLists = useStore(state => state.customLists)


  return(
    <div className="w-full h-full pl-15 pr-2 bg-[#1A1F29] text-[#E0E0E0] selection:bg-neutral-600">
      <SideBar />
      <ListsContainer container={dailyLists}/>
      <ListsContainer container={customLists}/>
    </div>
  )

}



export default App;