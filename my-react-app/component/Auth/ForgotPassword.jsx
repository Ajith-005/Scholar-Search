import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./style.css";

export default function ForgotPassword() {
  const [email, setEmail]     = useState("");
  const [otp, setOtp]         = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError]     = useState("");
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setMessage(""); setError(""); setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
        if (res.ok) { setMessage(data.message || "OTP sent to your email."); setOtpSent(true); }
      else setError(data.message || "Failed to send OTP.");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally { setLoading(false); }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setMessage(""); setError(""); setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
        if (res.ok) {
          setMessage("OTP verified! Redirecting…");
          setTimeout(() => navigate("/reset-password", { state: { email, otp } }), 1500);
      } else {
        setError(data.message || "Invalid OTP. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally { setLoading(false); }
  };

  return (
    <div className="fr-page">
      <div className="fr-card">

        {/* Icon */}
        <div className="fr-icon-wrap">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
        </div>

        {/* Header */}
        <div className="fr-header">
          <h2 className="fr-title">Forgot password?</h2>
          <p className="fr-sub">
            {!otpSent
              ? "Enter your registered email and we'll send you a one-time password."
              : "Check your inbox and enter the OTP we sent you."}
          </p>
        </div>

        {/* Step 1 — Email */}
        {!otpSent ? (
          <form className="fr-form" onSubmit={handleSendOtp}>
            <div className="fr-field">
              <label className="fr-label" htmlFor="fp-email">Email Address</label>
              <input
                id="fp-email"
                className="fr-input"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>

            {error   && <div className="fr-msg fr-msg--error"><FrErrorIcon />{error}</div>}
            {message && <div className="fr-msg fr-msg--success"><FrCheckIcon />{message}</div>}

            <button type="submit" className="fr-btn" disabled={loading}>
              {loading ? <><span className="fr-spinner" />Sending…</> : "Send OTP"}
            </button>
          </form>
        ) : (
          /* Step 2 — OTP */
          <form className="fr-form" onSubmit={handleVerifyOtp}>
            <div className="fr-otp-info">
              OTP sent to <strong>{email}</strong>. Check your inbox (and spam folder).
            </div>

            <div className="fr-field">
              <label className="fr-label" htmlFor="fp-otp">One-Time Password</label>
              <input
                id="fp-otp"
                className="fr-input fr-input--otp"
                type="text"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={e => setOtp(e.target.value)}
                required
                maxLength={6}
                inputMode="numeric"
                autoComplete="one-time-code"
              />
            </div>

            {error   && <div className="fr-msg fr-msg--error"><FrErrorIcon />{error}</div>}
            {message && <div className="fr-msg fr-msg--success"><FrCheckIcon />{message}</div>}

            <button type="submit" className="fr-btn" disabled={loading}>
              {loading ? <><span className="fr-spinner" />Verifying…</> : "Verify OTP"}
            </button>

            <button
              type="button"
              className="fr-btn-text"
              onClick={() => { setOtpSent(false); setOtp(""); setError(""); setMessage(""); }}
            >
              Resend OTP
            </button>
          </form>
        )}

        <Link to="/login" className="fr-back">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to sign in
        </Link>
      </div>
    </div>
  );
}

/* Small inline icon helpers */
function FrErrorIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="8" x2="12" y2="12"/>
      <line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  );
}
function FrCheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );
}