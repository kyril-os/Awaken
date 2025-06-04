import { create } from "zustand";
import type { List, Task } from "./types";
import { persist } from "zustand/middleware";

interface Store {
  dailyLists: List[];
  customLists: List[];
  addList: (list: List) => void;
  deleteList: (listId: number) => void;
  addTask: (listId: number, task: Task) => void;
  deleteTask: (listId: number, taskId: number) => void;
  updateTask: (listId: number, taskId: number, updatedFields: Partial<Task>) => void;
}


const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const defaultDailyLists: List[] = daysOfWeek.map((day,index) => ({
  id: index + 1,
  title: day,
  tasks: [{
    id: 1,
    title: "this is a test",
    completed: false,
    priority: "high",
    updatedAt: new Date()
  }],
}))


const useStore = create(persist<Store>(
  (set) => ({
    dailyLists: defaultDailyLists,
    customLists: [],

    addList: (list) =>
      set((state) => ({
        customLists: [...state.customLists, list]
      })),
    
    deleteList: (listId) =>
      set((state) => ({
        customLists: state.customLists.filter(list => list.id !== listId)
      })),

    addTask: (listId, task) =>
      set((state) => ({
        [listId > 7 ? "customLists" : "dailyLists"]:
          (listId > 7 ? state.customLists : state.dailyLists).map((list) => 
            list.id === listId ? {...list, tasks: [...list.tasks, task]} 
            : list ) 
      })),

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