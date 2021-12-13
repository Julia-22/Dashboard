import React from "react";

function useKeyEffect(buttonCode, handler) {
  React.useEffect(
    () => {
      const listener = (event) => {
        if (event.code == buttonCode) {
          handler(event);
        }
      };
      window.addEventListener("keydown", listener);
      return () => {
        window.removeEventListener("keydown", listener);
      };
    },
    [buttonCode, handler]
  );
}

export default useKeyEffect;