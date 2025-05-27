export interface task{
  id: number;
  title: string;
  description: string;
  createdAt: Date;
  dueDate?: Date | null;
  updatedAt: Date | null;
  completed: boolean;
  priority: "high" | "medium" | "low";
}