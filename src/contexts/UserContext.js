import { createContext, useEffect, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const localUser = JSON.parse(localStorage.getItem("user-linkr"));
  const [user, setUser] = useState(localUser);

  function persistUser(UserData) {
    setUser(UserData);
    localStorage.setItem("user-linkr", JSON.stringify(UserData));
  }

  useEffect(() => {
    setUser(localUser);
  }, []);

  return (
    <UserContext.Provider value={{ user, persistUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
