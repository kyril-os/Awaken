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
  addList: (title: string, isNewlyAdded?: boolean) => number;
  deleteList: (listId: number) => void;
  updateList: (listId: number, updatedFields: Partial<List>) => void;
  addTask: (listId: number, title: string) => void;
  deleteTask: (listId: number, taskId: number) => void;
  updateTask: (listId: number, taskId: number, updatedFields: Partial<Task>) => void;
  selectedTaskDetailsId: number | null;
  setSelectedTaskDetailsId: (id: number | null) => void;
}


const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const defaultDailyLists: List[] = daysOfWeek.map((day,index) => ({
  id: index + 1,
  title: day,
  // tasks: []
  tasks: [{
    id: Math.floor(Math.random() * 1000000000),
    title: "this is a test",
    completed: false,
    priority: "high",
    updatedAt: new Date(),
    subtasks: [
      {
        id: Math.floor(Math.random() * 10000000),
        title: "this is a subtask",
        completed: Math.random() < 0.5,
      }
    ]
  }],
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

    addList: (title, isNewlyAdded) =>{
      
      const theTasks: Task[] = isNewlyAdded ? [{
        id: -1,
        title: "__TRIGGER_FOCUS()__",
        completed: false,
        priority: "undefined",
        updatedAt: new Date()
      }] : []

      const list = {
        id: get().listIdIndex,
        title: title,
        tasks: theTasks,
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




        
        selectedTaskDetailsId: null,

        setSelectedTaskDetailsId: (id) => 
          set(() => ({
            selectedTaskDetailsId: id
          })),
    
  }),
  {
    name: "awaken",
  }
))


export default useStore;