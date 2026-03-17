import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext"; // adjust path if needed

export default function Logout() {
  const navigate = useNavigate();
  const { setUser, setUserAvatar } = useContext(AuthContext);

  useEffect(() => {
    // Remove token and clear user state
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userAvatar");

    setUser(null);
    setUserAvatar(null);

    // Redirect to login page
    navigate("/login", { replace: true });
  }, [navigate, setUser, setUserAvatar]);

  return null;
}
