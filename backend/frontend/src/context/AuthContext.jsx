import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    // Demo Role Logic
    if (email === "admin@gmail.com" && password === "1234") {
      setUser({ name: "Admin", role: "Admin" });
      return true;
    }

    if (email === "staff@gmail.com" && password === "1234") {
      setUser({ name: "Staff", role: "Staff" });
      return true;
    }

    if (email === "user@gmail.com" && password === "1234") {
      setUser({ name: "User", role: "User" });
      return true;
    }

    return false;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);