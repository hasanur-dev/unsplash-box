import { useUserContext } from "../contexts/UserContext";
import { loginUrl } from "../services/apiUnsplash";
import Button from "./Button";

export default function LoginLogout({ type }) {
  const { setUser } = useUserContext();
  const handleLogout = function () {
    setUser("");
    localStorage.removeItem("user");
  };
  if (type === "login") return <Button url={loginUrl}>Login</Button>;
  if (type === "logout") return <Button onClick={handleLogout}>Logout</Button>;
}
