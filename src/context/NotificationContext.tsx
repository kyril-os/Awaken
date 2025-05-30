import { createContext } from "react";
import type { NotificationPosition, NotificationType, NotificationIcon } from "../types";


interface NotificationContextType{
  type: NotificationType | undefined,
  message: string,
  position: NotificationPosition,
  icon: NotificationIcon,
  id: number;

  onUndo: Function | undefined,
  onTimeout: Function | undefined,

  notify: (type: NotificationType, message: string, position: NotificationPosition, icon: NotificationIcon, onUndo?: Function, onTimeout?: Function) => void; 
}


const NotificationContext = createContext<NotificationContextType>({
  type: undefined,
  message: "",
  position: "top-right",
  icon: "none",
  id: 0,

  onUndo: undefined,
  onTimeout: undefined,

  notify: () => {},
});





export default NotificationContext;