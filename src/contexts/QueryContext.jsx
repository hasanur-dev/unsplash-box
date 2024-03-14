import { createContext, useContext, useState } from "react";

const QueryContext = createContext();
function QueryProvider({ children }) {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <QueryContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </QueryContext.Provider>
  );
}

function useQueryContext() {
  const context = useContext(QueryContext);
  if (context === undefined)
    throw new Error("QueryContext was used outside the CitiesProvider");
  return context;
}

export { QueryProvider, useQueryContext };
