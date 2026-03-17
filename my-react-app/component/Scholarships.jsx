import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import './Scholarships.css';

function Scholarships({ wishlist, setWishlist }) {
  const location = useLocation();
  const [scholarships, setScholarships] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [search, setSearch] = useState("");
  const itemRefs = useRef([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/scholarships")
      .then(res => res.json())
      .then(data => {
        setScholarships(data);
        if (location.state?.openScholarshipId) {
          const idx = data.findIndex(sch => sch._id === location.state.openScholarshipId);
          if (idx !== -1) setOpenIndex(idx);
        }
      })
      .catch(err => console.error("Fetch error:", err));
  }, [location.state]);

  useEffect(() => {
    if (openIndex !== null && itemRefs.current[openIndex]) {
      itemRefs.current[openIndex].scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [openIndex]);

  const filteredScholarships = scholarships.filter(sch =>
    sch.name.toLowerCase().includes(search.toLowerCase()) ||
    (sch.amount && sch.amount.toString().toLowerCase().includes(search.toLowerCase()))
  );

  const isWishlisted = (id) => wishlist.some(item => item._id === id);

  const toggleWishlist = (e, scholarship) => {
    e.stopPropagation();
    setWishlist(prev =>
      isWishlisted(scholarship._id)
        ? prev.filter(item => item._id !== scholarship._id)
        : [...prev, scholarship]
    );
  };

  const toggleDetails = (index) => setOpenIndex(openIndex === index ? null : index);

  const renderEligibility = (eligibility) => {
    if (!eligibility) return "—";
    if (typeof eligibility === "object") {
      return Object.entries(eligibility).map(([key, value]) => (
        <div className="eligibility-row" key={key}>
          <span className="eligibility-key">{key.replace(/_/g, " ")}</span>
          <span className="eligibility-val">
            {typeof value === "object" ? JSON.stringify(value) : value?.toString()}
          </span>
        </div>
      ));
    }
    return eligibility;
  };

  return (
    <div className="scholar-background">
      <div className="scholarships-container">

        {/* ── PAGE HEADER ── */}
        <div className="page-header">
          <h1 className="page-title">Scholarships</h1>
          <p className="page-subtitle">Browse and save scholarships you're eligible for.</p>
        </div>

        {/* ── SEARCH ── */}
        <div className="search-bar-container">
          <div className="search-wrapper">
            <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              className="scholar-search-bar"
              placeholder="Search by name or amount…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && (
              <button className="search-clear" onClick={() => setSearch("")} aria-label="Clear search">
                ×
              </button>
            )}
          </div>
          {search && (
            <p className="search-results-count">
              {filteredScholarships.length} result{filteredScholarships.length !== 1 ? "s" : ""} found
            </p>
          )}
        </div>

        {/* ── LIST ── */}
        {filteredScholarships.length === 0 ? (
          <div className="no-results">
            <div className="no-results-icon">🔍</div>
            <p>No scholarships match <strong>"{search}"</strong>.</p>
            <button className="no-results-clear" onClick={() => setSearch("")}>Clear search</button>
          </div>
        ) : (
          <div className="scholarship-list">
            {filteredScholarships.map((scholarship, index) => {
              const isOpen = openIndex === index;
              const wishlisted = isWishlisted(scholarship._id);

              return (
                <div
                  key={scholarship._id || index}
                  className={`scholarship-item${isOpen ? " scholarship-item--open" : ""}`}
                  ref={el => (itemRefs.current[index] = el)}
                >
                  {/* HEADER ROW */}
                  <div className="scholarship-header" onClick={() => toggleDetails(index)}>
                    <div className="scholarship-meta">
                      <div className="scholarship-name">{scholarship.name}</div>
                      <div className="scholarship-amount">
                        {scholarship.amount ? scholarship.amount : "Amount not specified"}
                      </div>
                    </div>

                    <div className="scholarship-actions">
                      <button
                        className={`wishlist-btn${wishlisted ? " wishlisted" : ""}`}
                        onClick={e => toggleWishlist(e, scholarship)}
                        aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
                        title={wishlisted ? "Remove from wishlist" : "Save to wishlist"}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24"
                          fill={wishlisted ? "currentColor" : "none"}
                          stroke="currentColor" strokeWidth="2"
                          strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                        </svg>
                      </button>

                      <button className="expand-btn" aria-label={isOpen ? "Collapse" : "Expand"}>
                        <svg
                          className={`expand-icon${isOpen ? " expand-icon--open" : ""}`}
                          width="18" height="18" viewBox="0 0 24 24"
                          fill="none" stroke="currentColor" strokeWidth="2.5"
                          strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6 9 12 15 18 9"/>
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* EXPANDED DETAILS */}
                  <div className={`scholarship-details${isOpen ? " scholarship-details--open" : ""}`}>
                    <div className="details-inner">

                      <div className="detail-section">
                        <div className="detail-label">Eligibility</div>
                        <div className="detail-value eligibility-grid">
                          {renderEligibility(scholarship.eligibility)}
                        </div>
                      </div>

                      {scholarship.documents_required?.length > 0 && (
                        <div className="detail-section">
                          <div className="detail-label">Required Documents</div>
                          <div className="documents-list">
                            {scholarship.documents_required.map((doc, i) => (
                              <span className="document-tag" key={i}>{doc}</span>
                            ))}
                          </div>
                        </div>
                      )}

                      {scholarship.apply_link && (
                        <div className="detail-section">
                          <a
                            href={scholarship.apply_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="apply-btn"
                          >
                            Apply Now
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                              stroke="currentColor" strokeWidth="2.5"
                              strokeLinecap="round" strokeLinejoin="round">
                              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                              <polyline points="15 3 21 3 21 9"/>
                              <line x1="10" y1="14" x2="21" y2="3"/>
                            </svg>
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Scholarships;