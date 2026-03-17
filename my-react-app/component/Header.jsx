import { NavLink, useNavigate } from "react-router-dom";
import React, { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../component/Auth/AuthContext";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const { user, setUser, setUserAvatar } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isLoggedIn = !!user;

  // Shrink header on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const handleScholarSearchClick = (e) => {
    e.preventDefault();
    navigate(isLoggedIn ? "/scholarsearch" : "/login");
    setMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userAvatar");
    setUser(null);
    setUserAvatar(null);
    navigate("/");
    setMenuOpen(false);
  };

  const navItems = [
    { to: "/", label: "Home", noUnderline: true },
    { to: "/scholarships", label: "Scholarships" },
    { to: "/scholarsearch", label: "ScholarSearch", onClick: handleScholarSearchClick },
    { to: "/wishlist", label: "Wishlist" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header className={`header${scrolled ? " header--scrolled" : ""}`}>
      <div className="header-inner">

        {/* LOGO */}
        <NavLink to="/" className="header-logo" onClick={() => setMenuOpen(false)}>
          <div className="logo-mark">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="15" stroke="white" strokeWidth="2" opacity="0.3"/>
              <path d="M8 16 Q16 8 24 16 Q16 24 8 16Z" fill="white" opacity="0.9"/>
              <circle cx="16" cy="16" r="3" fill="white"/>
            </svg>
          </div>
          <span className="site-name">
            <span className="site-name-accent">Scholar</span>Search
          </span>
        </NavLink>

        {/* DESKTOP NAV */}
        <nav className="nav-desktop">
          <ul className="nav-list">
            {navItems.map(({ to, label, noUnderline, onClick }) => (
              <li key={label}>
                {onClick ? (
                  <a
                    href={to}
                    onClick={onClick}
                    className={`nav-link${noUnderline ? " no-underline" : ""}`}
                  >
                    {label}
                  </a>
                ) : (
                  <NavLink
                    to={to}
                    className={({ isActive }) =>
                      `nav-link${noUnderline ? " no-underline" : ""}${isActive ? " active" : ""}`
                    }
                    onClick={() => setMenuOpen(false)}
                  >
                    {label}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* AUTH BUTTON (desktop) */}
        <div className="nav-auth">
          {isLoggedIn ? (
            <button onClick={handleLogout} className="auth-btn auth-btn--logout">
              Logout
            </button>
          ) : (
            <NavLink to="/login" className="auth-btn auth-btn--login">
              Login
            </NavLink>
          )}
        </div>

        {/* HAMBURGER */}
        <button
          className={`menu-btn${menuOpen ? " menu-btn--open" : ""}`}
          onClick={() => setMenuOpen((p) => !p)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          <span className="hamburger-line" />
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>
      </div>

      {/* MOBILE DRAWER */}
      <div ref={menuRef} className={`mobile-menu${menuOpen ? " mobile-menu--open" : ""}`}>
        <ul className="mobile-nav-list">
          {navItems.map(({ to, label, noUnderline, onClick }) => (
            <li key={label}>
              {onClick ? (
                <a href={to} onClick={onClick} className="mobile-nav-link">
                  {label}
                </a>
              ) : (
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `mobile-nav-link${isActive ? " active" : ""}`
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </NavLink>
              )}
            </li>
          ))}
          <li className="mobile-auth">
            {isLoggedIn ? (
              <button onClick={handleLogout} className="auth-btn auth-btn--logout">
                Logout
              </button>
            ) : (
              <NavLink to="/login" className="auth-btn auth-btn--login" onClick={() => setMenuOpen(false)}>
                Login
              </NavLink>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;