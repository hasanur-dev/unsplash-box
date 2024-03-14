import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

const ModalContext = createContext();
export default function Modal({ children }) {
  const [isOpen, setIsOpen] = useState("");
  const [imageId, setImageId] = useState("");
  const open = (name, e) => {
    e.preventDefault();
    setIsOpen(name);
  };
  const close = () => {
    console.log("close");
    setIsOpen("");
  };
  return (
    <ModalContext.Provider value={{ isOpen, open, close, imageId, setImageId }}>
      {children}
    </ModalContext.Provider>
  );
}

const Open = function ({ id, children, opens }) {
  const { open, setImageId } = useContext(ModalContext);

  return cloneElement(children, {
    onClick: (e) => {
      if (id) setImageId(id);
      open(opens, e);
    },
  });
};
const Window = function ({ children, name }) {
  const { isOpen, close, imageId } = useContext(ModalContext);
  const ref = useRef();

  useEffect(() => {
    const handleClick = (e) => {
      // console.log(!ref.current?.contains(e.target));
      // console.log(e.target.tagName.toLowerCase());
      if (e.target.tagName.toLowerCase() === "label") return;
      else if (ref.current && !ref.current.contains(e.target)) {
        close();
      }
    };
    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [close]);

  if (isOpen !== name) return null;
  return createPortal(
    <div className="absolute left-0 top-0 z-50 grid h-full w-full place-items-center bg-gray-900/30 p-6 backdrop-blur-sm dark:bg-gray-100/20">
      <div
        ref={ref}
        className="max-h-full max-w-full rounded-[4px] bg-white dark:bg-gray-dark"
      >
        {cloneElement(children, { onClose: close, imageId: imageId })}
      </div>
    </div>,
    document.getElementById("app-layout"),
  );
};

Modal.Open = Open;
Modal.Window = Window;
