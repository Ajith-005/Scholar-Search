import React from "react";
import { useNavigate } from "react-router-dom";
import './Wishlist.css';

function Wishlist({ wishlist, setWishlist }) {
  const navigate = useNavigate();

  const removeFromWishlist = (scholarshipId) => {
    setWishlist(prev => prev.filter(sch => sch._id !== scholarshipId));
  };

  const openScholarship = (scholarship) => {
    navigate('/scholarships', { state: { openScholarshipId: scholarship._id } });
  };

  return (
    <div className="wl-page">
      <div className="wl-container">

        {/* ── PAGE HEADER ── */}
        <div className="wl-header">
          <div>
            <h1 className="wl-title">Saved Scholarships</h1>
            <p className="wl-subtitle">
              {wishlist.length > 0
                ? `${wishlist.length} scholarship${wishlist.length > 1 ? "s" : ""} saved`
                : "Scholarships you save will appear here"}
            </p>
          </div>
          {wishlist.length > 0 && (
            <button
              className="wl-clear-btn"
              onClick={() => setWishlist([])}
              aria-label="Clear all saved scholarships"
            >
              Clear All
            </button>
          )}
        </div>

        {/* ── EMPTY STATE ── */}
        {wishlist.length === 0 && (
          <div className="wl-empty">
            <div className="wl-empty-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </div>
            <h3 className="wl-empty-title">No saved scholarships</h3>
            <p className="wl-empty-text">
              Browse scholarships and tap the heart icon to save ones you're interested in.
            </p>
            <button className="wl-browse-btn" onClick={() => navigate('/scholarships')}>
              Browse Scholarships
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        )}

        {/* ── WISHLIST ITEMS ── */}
        {wishlist.length > 0 && (
          <div className="wl-list">
            {wishlist.map((scholarship, index) => (
              <div
                key={scholarship._id}
                className="wl-item"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="wl-item-left">
                  <div className="wl-item-index">{index + 1}</div>
                  <div className="wl-item-info">
                    <button
                      className="wl-name"
                      onClick={() => openScholarship(scholarship)}
                      title={`View details of ${scholarship.name}`}
                    >
                      {scholarship.name}
                    </button>
                    {scholarship.amount && (
                      <span className="wl-amount">{scholarship.amount}</span>
                    )}
                  </div>
                </div>

                <div className="wl-item-actions">
                  <button
                    className="wl-view-btn"
                    onClick={() => openScholarship(scholarship)}
                    aria-label={`View ${scholarship.name}`}
                  >
                    View
                  </button>
                  <button
                    className="wl-remove-btn"
                    onClick={() => removeFromWishlist(scholarship._id)}
                    aria-label={`Remove ${scholarship.name} from wishlist`}
                    title="Remove from saved"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6"/>
                      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                      <path d="M10 11v6M14 11v6"/>
                      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── FOOTER CTA ── */}
        {wishlist.length > 0 && (
          <div className="wl-footer">
            <button className="wl-browse-btn" onClick={() => navigate('/scholarships')}>
              Browse More Scholarships
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Wishlist;