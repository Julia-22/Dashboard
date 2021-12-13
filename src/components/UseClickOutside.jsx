import React from "react";

function useOnClickOutside(ref, handler, exception) {
  React.useEffect(
    () => {
      const listener = (event) => {
        if ([...event.target.classList].includes(exception)) {
          event.stopPropagation();
          return;
        }
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        
        handler(event);
      };
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    },
    [ref, handler]
  );
}

export default useOnClickOutside;