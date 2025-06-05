import { create } from "zustand";
import type { List, Task } from "./types";
import { persist } from "zustand/middleware";

interface Store {
  listIdIndex: number;
  listIndexIncrement: () => void;
  taskIdIndex: number;
  taskIndexIncrement: () => void;

  dailyLists: List[];
  customLists: List[];
  addList: (title: string) => number;
  deleteList: (listId: number) => void;
  updateList: (listId: number, updatedFields: Partial<List>) => void;
  addTask: (listId: number, title: string) => void;
  deleteTask: (listId: number, taskId: number) => void;
  updateTask: (listId: number, taskId: number, updatedFields: Partial<Task>) => void;
}


const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const defaultDailyLists: List[] = daysOfWeek.map((day,index) => ({
  id: index + 1,
  title: day,
  tasks: []
  // tasks: [{
  //   id: 1,
  //   title: "this is a test",
  //   completed: false,
  //   priority: "high",
  //   updatedAt: new Date()
  // }],
}))


const useStore = create(persist<Store>(
  (set, get) => ({
    taskIdIndex: 0,
    taskIndexIncrement: () => 
      set((state) => ({
        taskIdIndex: state.taskIdIndex+1
      })),

    listIdIndex: 8,
    listIndexIncrement: () => 
      set((state) => ({
        listIdIndex: state.listIdIndex+1
      })),

    dailyLists: defaultDailyLists,
    customLists: [],

    addList: (title) =>{
      
      const list = {
        id: get().listIdIndex,
        title: title,
        tasks: []
      };

      get().listIndexIncrement();

      set((state) => ({
        customLists: [list, ...state.customLists]
      }));

      return list.id;

    },
    
    deleteList: (listId) =>
      set((state) => ({
        customLists: state.customLists.filter(list => list.id !== listId)
      })),

    updateList: (lsitId, updatedFields) => 
      set((state) => ({
        [lsitId > 7 ? "customLists" : "dailyLists"]: 
          (lsitId > 7 ? state.customLists: state.dailyLists).map(list => 
            list.id === lsitId ? 
            {...list, ...updatedFields}
            : list
          )
      })),

    addTask: (listId, title) =>{
      const task:Task = {
        id: get().taskIdIndex,
        title: title,
        priority: "undefined",
        completed: false,
        updatedAt: new Date(),
      };

      get().taskIndexIncrement();

      set((state) => ({
        [listId > 7 ? "customLists" : "dailyLists"]:
          (listId > 7 ? state.customLists : state.dailyLists).map((list) => 
            list.id === listId ? {...list, tasks: [...list.tasks, task]} 
            : list ) 
      }))
    },

    deleteTask: (listId, taskId) => 
      set((state) => ({
        [listId > 7 ? "customLists" : "dailyLists"]:
          ( listId > 7 ? state.customLists : state.dailyLists ).map(list =>
            list.id === listId ? {...list, tasks: list.tasks.filter(task => task.id !== taskId)}
              : list )
      })),

      updateTask: (listId, taskId, updatedFields) =>
        set((state) => ({
          [listId > 7 ? "customLists" : "dailyLists"]:
            (listId > 7 ? state.customLists : state.dailyLists).map((list) => 
              list.id === listId ? 
                {
                  ...list,
                  tasks: list.tasks.map(task => task.id === taskId ? {...task, ...updatedFields, updatedAt: new Date()} : task)
                }
                : list
          )

        })),
    
  }),
  {
    name: "awaken",
  }
))


export default useStore;