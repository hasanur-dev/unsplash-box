import { cloneElement, useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";

export default function Modal({ children }) {
  const navigate = useNavigate();
  const ref = useRef();
  const close = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  useEffect(() => {
    const handleClick = (e) => {
      if (e.target.tagName.toLowerCase() === "label") return;
      else if (ref.current && !ref.current.contains(e.target)) {
        close();
      }
    };
    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [close]);

  return createPortal(
    <div className="absolute left-0 top-0 z-50 grid h-full w-full place-items-center bg-gray-900/30 p-6 backdrop-blur-sm dark:bg-gray-100/20">
      <div
        ref={ref}
        className="max-h-full max-w-full rounded-[4px] bg-white dark:bg-gray-dark"
      >
        {cloneElement(children, { onClose: close })}
      </div>
    </div>,
    document.getElementById("app-layout"),
    // document.body,
  );
}
