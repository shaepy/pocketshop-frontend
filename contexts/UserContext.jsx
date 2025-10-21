import { createContext, useState } from "react";

const UserContext = createContext();

const getUserFromToken = () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  console.log("token from getUserFromToken is:", token);
  console.log("user from getUserFromToken:", user);

  if (!token || !user) return null;
  return user;
};

function UserProvider({ children }) {
  const [user, setUser] = useState(getUserFromToken());
  const value = { user, setUser };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export { UserProvider, UserContext };
