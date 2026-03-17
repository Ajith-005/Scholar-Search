import React, { useContext } from "react";
import { AuthContext } from "./Auth/AuthContext";
import './Home1.css';

export default function Home() {
  const { user } = useContext(AuthContext);

  return (
    <div className="home-page">

      {/* ── HERO ── */}
      <div className="home-header">
        <div className="hero-content">
          <div className="hero-badge">Tamil Nadu Scholarship Portal</div>

          <h1 className="welcome-text">
            {user?.name ? (
              <>Welcome Back,<br /><span className="highlight">{user.name}</span></>
            ) : (
              <>Find Your<br /><span className="highlight">Scholarship</span></>
            )}
          </h1>

          <p className="intro-description">
            The ScholarSearch Portal with Personalized Filter System helps students
            discover scholarships they're eligible for — fast, simple, and free.
          </p>

          <div className="home-btn-group">
            <a href="/scholarships" className="home-nav-btn primary">
              <span>Browse Scholarships</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a href="/scholarsearch" className="home-nav-btn secondary">
              Smart Search
            </a>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">500+</span>
              <span className="stat-label">Scholarships</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-number">3 Types</span>
              <span className="stat-label">State · Central · NGO</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-number">Free</span>
              <span className="stat-label">Always</span>
            </div>
          </div>
        </div>

        <div className="header-img">
          <div className="img-ring">
            <img src="home5.png" alt="ScholarSearch" className="profile-img" />
          </div>
        </div>
      </div>

      {/* ── ABOUT ── */}
      <section className="about-section">
        <div className="about-inner">
          <div className="section-label">About</div>
          <h2 className="home-about">
            One Platform.<br />
            <span id="name">Every Scholarship.</span>
          </h2>
          <p className="about-description">
            The Tamil Nadu Smart Scholarship Portal is a one-stop platform designed to help students
            discover scholarships with ease. Using smart filters based on marks, caste, income, course,
            and more — it's simple, fast, and student-friendly, making it especially useful for rural
            and first-generation learners. State, Central, and Private/NGO scholarships, all in one place.
          </p>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="features">
        <div className="section-header">
          <div className="section-label">What We Offer</div>
          <h2 className="section-title">Built for Every Student</h2>
        </div>
        <div className="features-grid">
          {[
            { icon: "🎯", title: "Personalized Filters", desc: "Instantly match scholarships based on marks, caste, income, course, and personal eligibility." },
            { icon: "⚡", title: "Fast & Simple Search", desc: "Find the right scholarship in seconds — just enter your details and get instant results." },
            { icon: "🏛️", title: "Government & NGO", desc: "Discover State, Central, and Private/NGO scholarships in one unified place." },
            { icon: "🌱", title: "Student-Friendly", desc: "Specially designed for rural and first-generation learners with a clean, intuitive experience." },
          ].map(({ icon, title, desc }) => (
            <div className="feature-card" key={title}>
              <div className="card-icon">{icon}</div>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="services">
        <div className="section-header">
          <div className="section-label">Services</div>
          <h2 className="section-title">Everything You Need to Apply</h2>
        </div>
        <div className="services-grid">
          {[
            { icon: "🔍", title: "Scholarship Matching", desc: "Smart eligibility matrix that filters hundreds of scholarships to only the ones you qualify for." },
            { icon: "📋", title: "Details at a Glance", desc: "View eligibility criteria, award amount, deadline, and direct application links — all at once." },
            { icon: "🔗", title: "One-Step Application", desc: "Apply directly through official portals with all required documents listed clearly." },
            { icon: "💬", title: "Support & FAQs", desc: "Live support and a comprehensive FAQ section to guide you through every step." },
          ].map(({ icon, title, desc }) => (
            <div className="service-card" key={title}>
              <div className="card-icon">{icon}</div>
              <h4>{title}</h4>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <div className="home-contact">
        <div className="contact-grid">
          <a href="tel:9875643120" className="contact-item">
            <div className="contact-icon">
              <img src="what.png" alt="WhatsApp" className="homecon-img" />
            </div>
            <div>
              <div className="contact-label">WhatsApp</div>
              <div className="homecon-txt">(987) 564-3120</div>
            </div>
          </a>
          <a href="mailto:support@scholarsearch.com" className="contact-item">
            <div className="contact-icon">
              <img src="mail1.png" alt="Email" className="homecon-img" />
            </div>
            <div>
              <div className="contact-label">Email</div>
              <div className="homecon-txt">support@scholarsearch.com</div>
            </div>
          </a>
          <a href="tel:9876543210" className="contact-item">
            <div className="contact-icon">
              <img src="phone.png" alt="Phone" className="homecon-img" />
            </div>
            <div>
              <div className="contact-label">Phone</div>
              <div className="homecon-txt">(987) 654-3210</div>
            </div>
          </a>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <span className="footer-copy">© 2025 ScholarSearch. All rights reserved.</span>
        <span className="footer-sep">|</span>
        <a href="/contact" className="homecon-btn">Contact Us</a>
      </footer>
    </div>
  );
}