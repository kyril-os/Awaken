import type { ReactNode } from "react";


interface props {
  isOpen: boolean;
  children: ReactNode;
  className?: string;
}

const Collapsible = ({isOpen, children, className}:props) => {
  return(
    <div
      className={`overflow-hidden transition-all duration-300 ease-in-out
        ${isOpen? 'max-h-96 opacity-100' : 'max-h-0 -translate-y-3 opacity-0'}
        ${className}`}
    >
      {children}
    </div>
  )
}


export default Collapsible;