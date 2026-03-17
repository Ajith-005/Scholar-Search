import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import "./AvatarPage.css";

const avatars = [
  { id: 1,  name: "Boy 1",  img: "/avatar1.png",  phrase: "Ready to ace it!" },
  { id: 2,  name: "Girl 1", img: "/avatar6.png",  phrase: "You've got this!" },
  { id: 3,  name: "Boy 2",  img: "/avatar2.png",  phrase: "Dream big, work hard." },
  { id: 4,  name: "Girl 2", img: "/avatar7.png",  phrase: "Scholarships await!" },
  { id: 5,  name: "Boy 3",  img: "/avatar3.png",  phrase: "Stay focused!" },
  { id: 6,  name: "Girl 3", img: "/avatar8.png",  phrase: "Make it happen." },
  { id: 7,  name: "Boy 4",  img: "/avatar4.png",  phrase: "Keep pushing!" },
  { id: 8,  name: "Girl 4", img: "/avatar9.png",  phrase: "Reach for the stars." },
  { id: 9,  name: "Boy 5",  img: "/avatar5.png",  phrase: "Future scholar!" },
  { id: 10, name: "Girl 5", img: "/avatar10.png", phrase: "You're unstoppable." },
  { id: 11, name: "Boy 6",  img: "/avatar11.png", phrase: "Believe in yourself." },
  { id: 12, name: "Girl 6", img: "/avatar12.png", phrase: "Go get that grant!" },
];

export default function AvatarPage() {
  const { user, setUserAvatar } = useContext(AuthContext);
  const [selected, setSelected]   = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [saving, setSaving]       = useState(false);
  const [error, setError]         = useState("");
  const navigate = useNavigate();

  const handleSelect = (avatar) => {
    if (saving) return;
    setError("");
    setSaving(true);
    fetch("http://localhost:5000/api/auth/avatar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ avatar }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to save avatar");
        return res.json();
      })
      .then((data) => {
        setSelected(avatar.id);
        setUserAvatar(data.avatar);
        setTimeout(() => navigate("/"), 600);
      })
      .catch(() => {
        setError("Failed to save avatar. Please try again.");
        setSaving(false);
      });
  };

  return (
    <div className="av-page">
      <div className="av-container">

        {/* ── HEADER ── */}
        <div className="av-header">
          <div className="av-header-badge">Almost there!</div>
          <h1 className="av-title">Choose your avatar</h1>
          <p className="av-subtitle">
            Pick a character that represents you. You can change it later from your profile.
          </p>
        </div>

        {/* ── ERROR ── */}
        {error && (
          <div className="av-error">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            {error}
          </div>
        )}

        {/* ── AVATAR GRID ── */}
        <div className="av-grid">
          {avatars.map((avatar) => {
            const isSelected = selected === avatar.id;
            const isHovered  = hoveredId === avatar.id;
            const isFlipped  = isSelected || isHovered;

            return (
              <div
                key={avatar.id}
                className={`av-coin${isSelected ? " av-coin--selected" : ""}${saving && !isSelected ? " av-coin--disabled" : ""}`}
                onClick={() => handleSelect(avatar)}
                onMouseEnter={() => setHoveredId(avatar.id)}
                onMouseLeave={() => setHoveredId(null)}
                title={avatar.name}
              >
                <div className={`av-inner${isFlipped ? " av-inner--flipped" : ""}`}>
                  {/* Front */}
                  <div className="av-face av-front">
                    <img src={avatar.img} alt={avatar.name} className="av-img" />
                    <span className="av-name">{avatar.name}</span>
                  </div>
                  {/* Back */}
                  <div className="av-face av-back">
                    {isSelected ? (
                      <div className="av-check">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      </div>
                    ) : (
                      <>
                        <img src={avatar.img} alt={avatar.name} className="av-img av-img--back" />
                        <p className="av-phrase">"{avatar.phrase}"</p>
                      </>
                    )}
                  </div>
                </div>

                {/* Selection ring */}
                {isSelected && <div className="av-ring" />}
              </div>
            );
          })}
        </div>

        {/* ── FOOTER NOTE ── */}
        <p className="av-footer-note">
          Click any avatar to select and continue.
        </p>
      </div>
    </div>
  );
}