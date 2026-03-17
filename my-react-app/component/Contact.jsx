import React, { useState } from "react";
import "./Contact.css";

const ContactPage = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState(""); // "sending" | "success" | "error" | ""

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setForm({ name: "", email: "", phone: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const contactItems = [
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
        </svg>
      ),
      label: "Email",
      value: "support@scholarsearch.com",
      href: "mailto:support@scholarsearch.com",
    },
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.57 3.35a2 2 0 0 1 2-2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
      ),
      label: "Phone",
      value: "(987) 654-3210",
      href: "tel:9876543210",
    },
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
        </svg>
      ),
      label: "Address",
      value: "21 Tech Park Road, Chennai, Tamil Nadu 600113",
      href: null,
    },
  ];

  return (
    <div className="ct-page">
      <div className="ct-container">

        {/* ── LEFT PANEL ── */}
        <div className="ct-left">
          <div className="ct-left-inner">
            <div className="ct-label">Contact Us</div>
            <h1 className="ct-title">
              Let's build your future<br />
              <span className="ct-title-accent">with scholarships.</span>
            </h1>
            <p className="ct-desc">
              We help students discover scholarships that match their eligibility,
              assist with application management, and support educational opportunities
              across Tamil Nadu.
            </p>

            <div className="ct-info-list">
              {contactItems.map(({ icon, label, value, href }) => (
                <div className="ct-info-item" key={label}>
                  <div className="ct-info-icon">{icon}</div>
                  <div className="ct-info-body">
                    <span className="ct-info-label">{label}</span>
                    {href ? (
                      <a className="ct-info-value ct-info-link" href={href}>{value}</a>
                    ) : (
                      <span className="ct-info-value">{value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT PANEL / FORM ── */}
        <div className="ct-right">
          <div className="ct-form-header">
            <h2 className="ct-form-title">Send us a message</h2>
            <p className="ct-form-sub">
              We typically respond within one business day.
            </p>
          </div>

          {status === "success" ? (
            <div className="ct-success">
              <div className="ct-success-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <h3 className="ct-success-title">Inquiry sent!</h3>
              <p className="ct-success-text">We've received your message and will get back to you shortly.</p>
              <button className="ct-btn ct-btn--ghost" onClick={() => setStatus("")}>
                Send another message
              </button>
            </div>
          ) : (
            <form className="ct-form" onSubmit={handleSubmit}>
              <div className="ct-form-row">
                <div className="ct-field">
                  <label className="ct-field-label" htmlFor="ct-name">Full Name <span className="ct-required">*</span></label>
                  <input
                    id="ct-name"
                    className="ct-input"
                    type="text"
                    name="name"
                    placeholder="Your name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="ct-field">
                  <label className="ct-field-label" htmlFor="ct-email">Email Address <span className="ct-required">*</span></label>
                  <input
                    id="ct-email"
                    className="ct-input"
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="ct-field">
                <label className="ct-field-label" htmlFor="ct-phone">Phone Number <span className="ct-optional">(optional)</span></label>
                <input
                  id="ct-phone"
                  className="ct-input"
                  type="text"
                  name="phone"
                  placeholder="(987) 654-3210"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="ct-field">
                <label className="ct-field-label" htmlFor="ct-message">Your Query <span className="ct-required">*</span></label>
                <textarea
                  id="ct-message"
                  className="ct-input ct-textarea"
                  name="message"
                  placeholder="Tell us about the scholarship you're looking for, or any questions you have…"
                  value={form.message}
                  onChange={handleChange}
                  required
                />
              </div>

              {status === "error" && (
                <div className="ct-error">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  Something went wrong. Please try again.
                </div>
              )}

              <button
                type="submit"
                className={`ct-btn ct-btn--primary${status === "sending" ? " ct-btn--loading" : ""}`}
                disabled={status === "sending"}
              >
                {status === "sending" ? (
                  <>
                    <span className="ct-btn-spinner" />
                    Sending…
                  </>
                ) : (
                  <>
                    Send Inquiry
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                    </svg>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;