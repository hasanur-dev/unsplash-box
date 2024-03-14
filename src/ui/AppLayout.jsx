import { Outlet, useSearchParams } from "react-router-dom";
import Header from "./Header";
import { useUserContext } from "../contexts/UserContext";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import AddToCollections from "../features/Collections/AddToCollections";
import CreateCollection from "../features/Collections/CreateCollection";

export default function AppLayout() {
  const [searchParams, setSearchParams] = useSearchParams();
  const modal = searchParams.get("modal");
  const { user, setUser } = useUserContext();
  console.log(user);
  const [darkMode, setDarkMode] = useState(true);
  const handleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  useEffect(() => {
    const userLocal = JSON.parse(localStorage.getItem("user"));
    if (!user && userLocal) {
      setUser(userLocal);
    }
    if (user && !userLocal) localStorage.setItem("user", JSON.stringify(user));
  }, [setUser, user]);

  return (
    <div
      id="app-layout"
      className={`${darkMode ? "dark" : ""}  h-dvh overflow-x-hidden bg-white font-BeVietnam text-gray-transparent duration-300 *:transition-colors dark:bg-gray-dark dark:text-gray-very-light`}
    >
      <div className="mx-auto h-full max-w-[1280px] px-11 2xl:px-0">
        <Header darkMode={darkMode} handleDarkMode={handleDarkMode} />
        <Outlet />
        {modal === "addToCollection" && (
          <Modal>
            <AddToCollections />
          </Modal>
        )}
        {modal === "createCollection" && (
          <Modal>
            <CreateCollection />
          </Modal>
        )}
      </div>
    </div>
  );
}
