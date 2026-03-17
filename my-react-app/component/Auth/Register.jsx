import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../Auth/AuthContext";
import "./Register.css";

export default function Register() {
  const { setUser, setUserAvatar } = useContext(AuthContext);
  const [fullName, setFullName]   = useState("");
  const [email, setEmail]         = useState("");
  const [password, setPassword]   = useState("");
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.message || "Registration failed."); return; }

      // Auto-login after registration
      const loginRes = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!loginRes.ok) { navigate("/login"); return; }

      const loginData = await loginRes.json();
      setUser({ ...loginData.user, token: loginData.token });
      setUserAvatar(loginData.user.avatar);
      localStorage.setItem("user", JSON.stringify({ ...loginData.user, token: loginData.token }));
      localStorage.setItem("token", loginData.token);
      localStorage.setItem("userAvatar", JSON.stringify(loginData.user.avatar));
      navigate("/avatar");
    } catch {
      setError("Failed to register. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reg-page">
      <div className="reg-card">

        {/* ── LEFT PANEL ── */}
        <div className="reg-panel">
          <div className="reg-panel-inner">
            <div className="reg-badge">ScholarSearch</div>
            <h1 className="reg-panel-title">
              Start your<br /><span>journey.</span>
            </h1>
            <p className="reg-panel-desc">
              Create a free account to discover scholarships matched to your
              eligibility and save opportunities you care about.
            </p>
            <img src="/register2.png" alt="" className="reg-panel-img" />
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div className="reg-form-panel">
          <div className="reg-form-header">
            <h2 className="reg-form-title">Create account</h2>
            <p className="reg-form-sub">It's free and only takes a minute.</p>
          </div>

          <form className="reg-form" onSubmit={handleSubmit}>
            <div className="reg-field">
              <label className="reg-label" htmlFor="reg-name">Full Name</label>
              <input
                id="reg-name"
                className="reg-input"
                type="text"
                placeholder="Your full name"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                required
              />
            </div>

            <div className="reg-field">
              <label className="reg-label" htmlFor="reg-email">Email Address</label>
              <input
                id="reg-email"
                className="reg-input"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="reg-field">
              <label className="reg-label" htmlFor="reg-password">Password</label>
              <input
                id="reg-password"
                className="reg-input"
                type="password"
                placeholder="Choose a strong password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <div className="reg-error">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                {error}
              </div>
            )}

            <button type="submit" className="reg-btn" disabled={loading}>
              {loading ? (
                <><span className="reg-spinner" />Creating account…</>
              ) : (
                <>
                  Create Account
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </>
              )}
            </button>
          </form>

          <p className="reg-switch">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}