import { useState, type ReactNode } from "react";
import NotificationContext from "./NotificationContext";
import { type NotificationIcon, type NotificationPosition, type NotificationType } from "../types";



const NotificationProvider = ({ children }: {children: ReactNode}) => {

  const [type, setType] = useState<NotificationType | undefined>(undefined);
  const [position, setPosition] = useState<NotificationPosition>("top-right");
  const [message, setMessage] = useState<string>("");
  const [icon, setIcon] = useState<NotificationIcon>("none");
  const [id, setId] = useState<number>(0);
  const [onUndo, setOnUndo] = useState<Function | undefined>(undefined);
  const [onTimeout, setOnTimeout] = useState<Function | undefined>(undefined)




  const notify = (type: NotificationType, message: string, position: NotificationPosition, icon: NotificationIcon, onUndo?: Function, onTimeout?: Function) => {
    setType(type);
    setMessage(message);
    setPosition(position);
    setIcon(icon);
    setId(prev => prev + 1);

    setOnUndo(() => onUndo);
    setOnTimeout(() => onTimeout);
    
  }



      return(
      <NotificationContext.Provider 
        value={{type,message,position,icon,id,onUndo,onTimeout,notify}}
      >
        {children}
      </NotificationContext.Provider>

    )
}

export default NotificationProvider;