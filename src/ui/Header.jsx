import { NavLink } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";
import LoginLogout from "./LoginLogout";
import Button from "./Button";
import { MdDarkMode } from "react-icons/md";
import { CiSun } from "react-icons/ci";
export default function Header({ darkMode, handleDarkMode }) {
  const { user, setUser } = useUserContext();
  return (
    <header className="relative flex items-center justify-between py-5 after:absolute after:-left-1/2 after:bottom-0 after:h-[1px] after:w-[300%] after:bg-gray-very-light dark:after:bg-gray-very-light/30">
      <NavLink to="/">
        <div>
          <img className="hidden h-6 dark:block" src="/Logo-white.svg" alt="" />
          <img className="block h-6 dark:hidden" src="/Logo-dark.svg" alt="" />
        </div>
      </NavLink>
      <nav>
        <ul className="flex items-center gap-6">
          <li className="">
            <NavLink
              className="navLink rounded-md bg-gray-light/0 px-5 py-2.5  text-sm font-medium transition-colors duration-300"
              to="home"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className="navLink rounded-md bg-gray-light/0 px-5 py-2.5 text-sm font-medium transition-colors duration-300"
              to="collections"
            >
              Collections
            </NavLink>
          </li>
          <li>
            <Button onClick={handleDarkMode}>
              {!darkMode && <MdDarkMode className="text-xl" />}
              {darkMode && <CiSun className="text-xl" />}
            </Button>
          </li>
          <li>
            <LoginLogout type={user ? "logout" : "login"} />
          </li>
        </ul>
      </nav>
    </header>
  );
}
