import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import "./style.css";

export default function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";
  const otp = location.state?.otp || "";

  const [newPassword, setNewPassword]         = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading]                 = useState(false);
  const [error, setError]                     = useState("");
  const [success, setSuccess]                 = useState(false);

  /* Guard — no email or otp means direct access without OTP flow */
  if (!email || !otp) {
    return (
      <div className="fr-page">
        <div className="fr-card">
          <div className="fr-icon-wrap fr-icon-wrap--warn">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          </div>
          <h2 className="fr-title">Session expired</h2>
          <p className="fr-sub" style={{ textAlign: "center", marginBottom: 24 }}>
            No email information found. Please restart the forgot password flow.
          </p>
          <Link to="/forgot-password" className="fr-btn" style={{ textDecoration: "none", textAlign: "center" }}>
            Go to Forgot Password
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (newPassword !== confirmPassword) { setError("Passwords do not match."); return; }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
        setTimeout(() => navigate("/login"), 2500);
      } else {
        setError(data.message || "Failed to reset password.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally { setLoading(false); }
  };

  return (
    <div className="fr-page">
      <div className="fr-card">

        {success ? (
          /* ── Success state ── */
          <div className="fr-success">
            <div className="fr-success-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <h2 className="fr-title">Password reset!</h2>
            <p className="fr-sub" style={{ textAlign: "center" }}>
              Your password has been updated successfully.<br />Redirecting you to sign in…
            </p>
          </div>
        ) : (
          <>
            {/* Icon */}
            <div className="fr-icon-wrap">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>

            {/* Header */}
            <div className="fr-header">
              <h2 className="fr-title">Set new password</h2>
              <p className="fr-sub">
                Resetting password for <strong>{email}</strong>
              </p>
            </div>

            <form className="fr-form" onSubmit={handleSubmit}>
              <div className="fr-field">
                <label className="fr-label" htmlFor="rp-new">New Password</label>
                <input
                  id="rp-new"
                  className="fr-input"
                  type="password"
                  placeholder="Choose a strong password"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  required
                />
              </div>

              <div className="fr-field">
                <label className="fr-label" htmlFor="rp-confirm">Confirm Password</label>
                <input
                  id="rp-confirm"
                  className="fr-input"
                  type="password"
                  placeholder="Repeat your new password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              {error && (
                <div className="fr-msg fr-msg--error">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  {error}
                </div>
              )}

              <button type="submit" className="fr-btn" disabled={loading}>
                {loading ? <><span className="fr-spinner" />Resetting…</> : "Reset Password"}
              </button>
            </form>

            <Link to="/forgot-password" className="fr-back">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              Back
            </Link>
          </>
        )}
      </div>
    </div>
  );
}