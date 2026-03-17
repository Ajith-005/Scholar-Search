import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import { AuthProvider } from "../component/Auth/AuthContext";

import Header from "../component/Header";
import Home from "../component/Home";
import Login from "../component/Auth/Login";
import AvatarPage from "../component/Auth/AvatarPage";
import Register from "../component/Auth/Register";
import ScholarSearch from "../component/ScholarSearch";
import ProtectedRoute from "../component/ProtectedRoute";
import ForgotPassword from "../component/Auth/ForgotPassword";
import ResetPassword from "../component/Auth/ResetPassword";
import ErrorBoundary from "../component/ErrorBoundary";
import Scholarships from "../component/Scholarships";
import Wishlist from "../component/Wishlist";
import Contact from "../component/Contact";

import Home1 from "../component/Home1";


export default function App() {
  const location = useLocation();
  const hideHeaderRoutes = ["/login",
    "/register",
    "/AvatarPage",
    "/forgot-password",
    "/reset-password"];
  const shouldHideHeader = hideHeaderRoutes.includes(location.pathname);

  // Add wishlist state here
  // Load wishlist from localStorage or start with []
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  return (
    <AuthProvider>
      {!shouldHideHeader && <Header />}
      <Routes>
                <Route path="/" element={<Home1 />} />

        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/scholarships" element={<Scholarships wishlist={wishlist} setWishlist={setWishlist} />} />
        <Route path="/wishlist" element={<Wishlist wishlist={wishlist} setWishlist={setWishlist} />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/avatar"
          element={
            <ProtectedRoute>
              <AvatarPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/scholarsearch"
          element={
            <ProtectedRoute>
              <ScholarSearch />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AuthProvider>
  );
}
