import { createContext, useContext, useState } from "react";

const UserContext = createContext();
function UserProvider({ children }) {
  const [user, setUser] = useState("");
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

function useUserContext() {
  const context = useContext(UserContext);
  if (context === undefined)
    throw new Error("UserContext was used outside the CitiesProvider");
  return context;
}

export { UserProvider, useUserContext };
