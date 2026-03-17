import React, { useContext } from "react";
import { AuthContext } from "./Auth/AuthContext";
import './Home.css';

export default function Home() {
  const { user } = useContext(AuthContext);

  return (
    <div className="home-main">
      {/* ---- HERO SECTION ---- */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            {user?.name ? (
              <>Welcome Back, <span className="hero-accent">{user.name}</span>!</>
            ) : (
              <>Invest in Your Future<br /><span className="hero-accent">With ScholarSearch</span></>
            )}
          </h1>
          <p className="hero-desc">
            The ScholarSearch Portal uses smart filters to help students instantly find scholarships they are eligible for, simplifying the search and empowering more students to pursue higher education.
          </p>
          <div className="hero-btn-group">
            <a href="/scholarships" className="hero-btn green">Scholarships</a>
            <a href="/scholarsearch" className="hero-btn">ScholarSearch</a>
          </div>
        </div>
        <div className="hero-img">
          <img src="home5.png" alt="Scholarsearch Graph" />
        </div>
      </section>

      {/* ---- FEATURES WE HAVE ---- */}
      <section className="features">
        <h2>Features We Have</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Personalized Filters</h3>
            <p>Instantly match scholarships based on marks, caste, income, and course.</p>
          </div>
          <div className="feature-card">
            <h3>Fast & Simple Search</h3>
            <p>Find scholarships in seconds with easy data entry and instant results.</p>
          </div>
          <div className="feature-card">
            <h3>Government & NGO</h3>
            <p>Discover State, Central, and Private/NGO scholarships in one place.</p>
          </div>
          <div className="feature-card">
            <h3>Student-Friendly</h3>
            <p>Specially designed for rural and first-generation learners.</p>
          </div>
        </div>
      </section>

      {/* ---- SERVICES WE OFFER ---- */}
      <section className="services">
        <h2>Services We Offer</h2>
        <div className="services-grid">
          <div className="service-card">
            <h4>Scholarship Matching</h4>
            <p>Smart eligibility matrix & filter.</p>
          </div>
          <div className="service-card">
            <h4>Details at a Glance</h4>
            <p>All info: eligibility, amount, deadline, link.</p>
          </div>
          <div className="service-card">
            <h4>One-Step Application</h4>
            <p>Direct apply links with all required documents listed.</p>
          </div>
          <div className="service-card">
            <h4>Support</h4>
            <p>Live support and FAQs for users.</p>
          </div>
        </div>
      </section>

      {/* ---- FOOTER & CONTACT ---- */}
      <footer className="footer">
        <div className="footer-contact">
          <div><img src="what.png" alt="WhatsApp" /><span>(987) 564-3120</span></div>
          <div><img src="mail1.png" alt="Mail" /><span>support@scholarsearch.com</span></div>
          <div><img src="phone.png" alt="Phone" /><span>(987) 654-3210</span></div>
        </div>
        <div className="footer-links">
          <a href="/contact" className="footer-btn">Go to Contact</a>
          <span>© 2025 ScholarSearch. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
