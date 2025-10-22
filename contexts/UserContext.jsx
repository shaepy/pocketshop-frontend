import { createContext, useState, useEffect } from "react";
import { getUser } from "../services/userService";

const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      if (token) {
        try {
          const userData = await getUser(userId);
          setUser(userData);
        } catch (error) {
          console.error("Error fetching user:", error);
          setUser(null);
        }
      }

      setLoading(false);
    };

    fetchUser();
  }, []);

  const value = { user, setUser, loading };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export { UserProvider, UserContext };
