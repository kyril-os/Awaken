
export type prioritype = "high" | "medium" | "low";

export interface task{
  id: number;
  title: string;
  description: string;
  createdAt: Date;
  dueDate?: Date | null;
  updatedAt: Date | null;
  completed: boolean;
  priority: prioritype;
}


export type NotificationType = "complete" | "delete"

export type NotificationIcon = "check" | "xmark" | "none";

export type NotificationPosition = "top-right" | "buttom";