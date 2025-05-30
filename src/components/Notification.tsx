import { CheckIcon, XMarkIcon } from "@heroicons/react/20/solid";
// import type { NotificationPosition, NotificationType } from "../types";
import { useEffect, useState, useContext, useRef } from "react";
import NotificationContext from "../context/NotificationContext";

// type props = {
//   type: NotificationType;
//   message: string;
//   position?: NotificationPosition;
// }





const Notification = () => {

  const {icon, type, message, position, id, onUndo, onTimeout } = useContext(NotificationContext);
  const [show, setShow] = useState<boolean>(false)
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if(message) {
      setShow(true);

      timerRef.current = setTimeout(() => {
        setShow(false);
        if (onTimeout) onTimeout();
      }, type === "complete" ? 2000 : 3000)

      return () => {
        if(timerRef.current) clearTimeout(timerRef.current)}
    }
  }, [id])

  let iconJSX;

  if (icon === "check")
    iconJSX = <CheckIcon className="h-5 w-5 text-green-500 mr-2" />;
  else if (icon === "xmark")
    iconJSX = <XMarkIcon className="h-5 w-5 text-red-500 mr-2" />;
  else iconJSX = null;

  const positionClass = position === "buttom"? "bottom-4 right-1/2 translate-x-1/2" : "top-5 right-4" 

  return(
    show ?
    <>
      <div className={`flex fixed ${positionClass} bg-zinc-600 rounded-2xl p-2 px-4 items-center justify-center gap-2 shadow shadow-black
      transition-opacity duration-5000 ease-in-out`}>
        {iconJSX}
        <span className="">{message}</span>
        {type === "delete" &&
          (
            <button
              className="text-sky-400 cursor-pointer underline"
              onClick={() => {

                if(timerRef.current){
                  clearTimeout(timerRef.current);
                  timerRef.current = null;
                }


                if (onUndo) onUndo();
                setShow(false);
              }}>
                Undo
            </button>
          )
        }
      </div>
    </>
    : null
  )
}

export default Notification;