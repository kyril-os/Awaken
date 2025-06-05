


export interface List {
  id: number,
  title: string,
  tasks: Task[],
  date?: Date,
}


export interface Task {
  id: number,
  title: string,
  description?: string,
  subtasks?: SubTask[],
  completed: boolean,
  priority: prioritype,
  updatedAt: Date,
}


export interface SubTask {
  id: number,
  title: string,
  completed: boolean,
}


export type prioritype = "high" | "medium" | "low" | "undefined";