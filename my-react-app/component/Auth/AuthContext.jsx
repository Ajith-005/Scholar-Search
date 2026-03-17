import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [userAvatar, setUserAvatar] = useState(() => {
    const savedAvatar = localStorage.getItem("userAvatar");
    return savedAvatar ? JSON.parse(savedAvatar) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  useEffect(() => {
    if (userAvatar) {
      localStorage.setItem("userAvatar", JSON.stringify(userAvatar));
    } else {
      localStorage.removeItem("userAvatar");
    }
  }, [userAvatar]);

  return (
    <AuthContext.Provider value={{ user, setUser, userAvatar, setUserAvatar }}>
      {children}
    </AuthContext.Provider>
  );
}
