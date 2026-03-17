import React, { useState } from "react";
import "./ScholarSearch.css";

const scholarships = [
  {
    name: "Central Sector Scholarship",
    amount: "₹10,000 – ₹20,000 per year",
    eligibility: {
      maxIncome: 450000,
      studyLevel: ["UG", "PG"],
      academicPercent: 75,
      gender: "any",
      differentlyAbled: "any",
      community: "any",
      religion: "any",
      caste: "optional",
      marks: { class10: "Not required", class11: "Not required", class12: "Minimum 75%", ug: "Minimum 75%", pg: "Minimum 75%" },
      other: "Top 20 percentile in Class 12 board exams"
    },
    documents: ["Income certificate", "Caste certificate (if applicable)", "Class 12 mark sheet", "Aadhaar", "Bank details"],
    link: "https://scholarships.gov.in"
  },
  {
    name: "ONGC Scholarship",
    amount: "₹48,000 per year (₹4,000/month)",
    eligibility: {
      maxIncome: 250000,
      studyLevel: ["Engineering", "MBBS", "MBA", "Geology"],
      academicPercent: 60,
      gender: "any",
      differentlyAbled: "any",
      community: "SC/ST/OBC/EWS",
      religion: "any",
      caste: "required",
      marks: { class10: "Minimum 60%", class11: "Minimum 60%", class12: "Minimum 60%", ug: "N/A", pg: "N/A" },
      other: "First year professional courses; SC/ST/OBC/EWS categories"
    },
    documents: ["Proof of age", "Academic records", "Caste certificate", "Income certificate", "Admission proof", "Aadhaar/PAN", "Bank details", "Undertaking"],
    link: "https://ongcscholar.org"
  },
  {
    name: "National Means-cum-Merit Scholarship (NMMSS)",
    amount: "₹12,000 per annum",
    eligibility: {
      maxIncome: 350000,
      studyLevel: ["Class 9"],
      academicPercent: 55,
      gender: "any",
      differentlyAbled: "any",
      community: "any",
      religion: "any",
      caste: "optional",
      marks: { class10: "N/A", class11: "N/A", class12: "N/A", ug: "N/A", pg: "N/A" },
      other: "Student of government/aided school"
    },
    documents: ["Aadhaar", "Income certificate", "Mark sheets", "Bonafide certificate"],
    link: "https://scholarships.gov.in"
  },
  {
    name: "Central Sector Scholarship for SC Students",
    amount: "Tuition up to ₹2 lakh annually + allowances",
    eligibility: {
      maxIncome: 800000,
      studyLevel: ["UG", "PG"],
      academicPercent: 50,
      gender: "any",
      differentlyAbled: "any",
      community: "SC",
      religion: "any",
      caste: "required",
      marks: { class10: "Minimum 50%", class11: "Minimum 50%", class12: "Minimum 50%", ug: "Minimum 50%", pg: "Minimum 50%" },
      other: "Admission through competitive exams"
    },
    documents: ["Income certificate", "Caste certificate", "Admission proof", "Mark sheets"],
    link: "https://scholarships.gov.in"
  },
  {
    name: "Vidyadhan Tamil Nadu Plus 1 Scholarship",
    amount: "Up to ₹10,000 per year",
    eligibility: {
      maxIncome: 200000,
      studyLevel: ["+2"],
      academicPercent: 80,
      gender: "any",
      differentlyAbled: "any",
      community: "any",
      religion: "any",
      caste: "optional",
      marks: { class10: "Minimum 80% (State Board), 90% (CBSE)", class11: "N/A", class12: "N/A", ug: "N/A", pg: "N/A" },
      other: "Tamil Nadu students only"
    },
    documents: ["Mark sheets", "Income certificate", "Caste certificate", "Aadhaar"],
    link: "https://vidyadhan.org"
  },
  {
    name: "Minorities Pre-Matric Scholarship",
    amount: "₹1,000 – ₹6,000 annually",
    eligibility: {
      maxIncome: 100000,
      studyLevel: ["1 to 10"],
      academicPercent: 0,
      gender: "any",
      differentlyAbled: "any",
      community: "Minority",
      religion: "any",
      caste: "optional",
      marks: { class10: "N/A", class11: "N/A", class12: "N/A", ug: "N/A", pg: "N/A" },
      other: "Minority community students"
    },
    documents: ["Minority certificate", "Income proof", "Mark sheets", "Bonafide"],
    link: "https://scholarships.gov.in"
  },
  {
    name: "Minorities Post-Matric Scholarship",
    amount: "₹2,300 – ₹10,000+ annually",
    eligibility: {
      maxIncome: 200000,
      studyLevel: ["11 to PhD"],
      academicPercent: 50,
      gender: "any",
      differentlyAbled: "any",
      community: "Minority",
      religion: "any",
      caste: "optional",
      marks: { class10: "N/A", class11: "Minimum 50%", class12: "Minimum 50%", ug: "Minimum 50%", pg: "Minimum 50%" },
      other: "Minority students"
    },
    documents: ["Minority certificate", "Income proof", "Mark sheets", "Bonafide"],
    link: "https://scholarships.gov.in"
  },
  {
    name: "AICTE Pragati Scholarship",
    amount: "₹30,000 per year",
    eligibility: {
      maxIncome: 800000,
      studyLevel: ["Technical UG"],
      academicPercent: 0,
      gender: "female",
      differentlyAbled: "any",
      community: "any",
      religion: "any",
      caste: "optional",
      marks: { class10: "N/A", class11: "N/A", class12: "N/A", ug: "N/A", pg: "N/A" },
      other: "Girl students in technical education courses"
    },
    documents: ["Admission proof", "Income certificate", "Caste certificate"],
    link: "https://www.aicte-india.org/pragati"
  },
  {
    name: "AICTE Saksham Scholarship",
    amount: "₹30,000 per year",
    eligibility: {
      maxIncome: 800000,
      studyLevel: ["Technical UG"],
      academicPercent: 0,
      gender: "any",
      differentlyAbled: "yes",
      community: "any",
      religion: "any",
      caste: "optional",
      marks: { class10: "N/A", class11: "N/A", class12: "N/A", ug: "N/A", pg: "N/A" },
      other: "Differently-abled students"
    },
    documents: ["Disability certificate", "Admission proof", "Income certificate"],
    link: "https://www.aicte-india.org/saksham"
  }
];

const STEPS = [
  { id: "basic",   label: "Basic Info",  icon: "👤" },
  { id: "marks",   label: "Marks",       icon: "📊" },
  { id: "results", label: "Results",     icon: "🎓" },
];

const ScholarshipApp = () => {
  const [step, setStep] = useState(0); // 0 = basic, 1 = marks, 2 = results
  const [loading, setLoading] = useState(false);
  const [eligibleScholarships, setEligibleScholarships] = useState([]);

  const [form, setForm] = useState({
    income: "",
    studyLevel: "",
    academicPercent: "",
    category: "",
    gender: "",
    differentlyAbled: false,
    marks10: "",
    marks11: "",
    marks12: "",
    marksUG: "",
    marksPG: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const parseMark = (str) => {
    if (!str || str.toLowerCase().includes("not required") || str.toLowerCase() === "n/a") return 0;
    const m = str.match(/\d+/);
    return m ? Number(m[0]) : 0;
  };

  const checkEligibility = (sch) => {
    const income = Number(form.income);
    const percent = Number(form.academicPercent);
    const studyLevel = form.studyLevel.toLowerCase();
    const category = form.category.toLowerCase();
    const gender = form.gender.toLowerCase();
    const isDA = form.differentlyAbled;

    if (income > sch.eligibility.maxIncome) return false;
    const levels = sch.eligibility.studyLevel.map(s => s.toLowerCase());
    if (!levels.some(level => studyLevel.includes(level))) return false;
    if (sch.eligibility.academicPercent && percent < sch.eligibility.academicPercent) return false;
    if (sch.eligibility.community && sch.eligibility.community.toLowerCase() !== "any") {
      if (!sch.eligibility.community.toLowerCase().includes(category)) return false;
    }
    if (sch.eligibility.gender && sch.eligibility.gender.toLowerCase() !== "any" &&
      sch.eligibility.gender.toLowerCase() !== gender) return false;
    if (sch.eligibility.differentlyAbled === "yes" && !isDA) return false;
    if (sch.name.includes("SC Students") && category !== "sc") return false;
    if (sch.name.includes("ONGC") && !["sc", "st", "obc", "ews"].includes(category)) return false;
    if (sch.name.includes("AICTE Pragati") && gender !== "female") return false;
    if (sch.name.includes("AICTE Saksham") && !isDA) return false;

    const marks = sch.eligibility.marks || {};
    if (parseMark(marks.class10) > Number(form.marks10 || 0)) return false;
    if (parseMark(marks.class11) > Number(form.marks11 || 0)) return false;
    if (parseMark(marks.class12) > Number(form.marks12 || 0)) return false;
    if (studyLevel.includes("ug") && parseMark(marks.ug) > Number(form.marksUG || 0)) return false;
    if (studyLevel.includes("pg") && parseMark(marks.pg) > Number(form.marksPG || 0)) return false;
    return true;
  };

  const handleBasicNext = (e) => {
    e.preventDefault();
    setStep(1);
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setEligibleScholarships(scholarships.filter(checkEligibility));
      setLoading(false);
      setStep(2);
    }, 2200);
  };

  const handleReset = () => {
    setForm({ income: "", studyLevel: "", academicPercent: "", category: "", gender: "", differentlyAbled: false, marks10: "", marks11: "", marks12: "", marksUG: "", marksPG: "" });
    setEligibleScholarships([]);
    setStep(0);
  };

  return (
    <div className="ss-page">

      {/* Loading overlay */}
      {loading && (
        <div className="ss-loading">
          <div className="ss-loading-inner">
            <div className="ss-spinner">
              <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
                <circle cx="28" cy="28" r="22" stroke="#dde8f0" strokeWidth="5"/>
                <circle cx="28" cy="28" r="22" stroke="#2e8fc9" strokeWidth="5"
                  strokeLinecap="round" strokeDasharray="80 60"
                  className="ss-spin-arc"/>
              </svg>
              <span className="ss-loading-cap">🎓</span>
            </div>
            <p className="ss-loading-text">Finding your scholarships…</p>
          </div>
        </div>
      )}

      <div className="ss-container">

        {/* Page header */}
        <div className="ss-page-header">
          <h1 className="ss-page-title">Smart Scholar Search</h1>
          <p className="ss-page-subtitle">Enter your details and we'll match you with the scholarships you qualify for.</p>
        </div>

        {/* Step indicator */}
        <div className="ss-steps">
          {STEPS.map((s, i) => (
            <React.Fragment key={s.id}>
              <div className={`ss-step ${i < step ? "ss-step--done" : ""} ${i === step ? "ss-step--active" : ""}`}>
                <div className="ss-step-circle">
                  {i < step
                    ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                    : <span>{s.icon}</span>}
                </div>
                <span className="ss-step-label">{s.label}</span>
              </div>
              {i < STEPS.length - 1 && <div className={`ss-step-line ${i < step ? "ss-step-line--done" : ""}`} />}
            </React.Fragment>
          ))}
        </div>

        {/* ── STEP 0: Basic Info ── */}
        {!loading && step === 0 && (
          <form className="ss-form" onSubmit={handleBasicNext}>
            <div className="ss-form-grid">
              <div className="ss-field">
                <label className="ss-label">Family Annual Income (₹)</label>
                <input className="ss-input" type="number" name="income" value={form.income}
                  onChange={handleChange} min="0" placeholder="e.g. 250000" required />
              </div>

              <div className="ss-field">
                <label className="ss-label">Current Study Level</label>
                <select className="ss-input" name="studyLevel" value={form.studyLevel} onChange={handleChange} required>
                  <option value="">— Select —</option>
                  <option value="+2">+2 / Class 12</option>
                  <option value="Class 9">Class 9</option>
                  <option value="1 to 10">Class 1–10</option>
                  <option value="11 to PhD">Class 11 to PhD</option>
                  <option value="UG">Undergraduate (UG)</option>
                  <option value="PG">Postgraduate (PG)</option>
                  <option value="Engineering">Engineering</option>
                  <option value="MBBS">MBBS</option>
                  <option value="MBA">MBA</option>
                  <option value="Technical UG">Technical UG</option>
                </select>
              </div>

              <div className="ss-field">
                <label className="ss-label">Overall Academic % (current)</label>
                <input className="ss-input" type="number" name="academicPercent" value={form.academicPercent}
                  onChange={handleChange} min="0" max="100" placeholder="e.g. 78" required />
              </div>

              <div className="ss-field">
                <label className="ss-label">Category</label>
                <select className="ss-input" name="category" value={form.category} onChange={handleChange} required>
                  <option value="">— Select —</option>
                  <option value="General">General</option>
                  <option value="SC">SC</option>
                  <option value="ST">ST</option>
                  <option value="OBC">OBC</option>
                  <option value="EWS">EWS</option>
                  <option value="Minority">Minority</option>
                </select>
              </div>

              <div className="ss-field">
                <label className="ss-label">Gender</label>
                <select className="ss-input" name="gender" value={form.gender} onChange={handleChange} required>
                  <option value="">— Select —</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="ss-field ss-field--checkbox">
                <label className="ss-checkbox-label">
                  <input type="checkbox" name="differentlyAbled" checked={form.differentlyAbled} onChange={handleChange} />
                  <span className="ss-checkbox-custom" />
                  Differently Abled
                </label>
              </div>
            </div>

            <div className="ss-form-footer">
              <button type="submit" className="ss-btn ss-btn--primary">
                Continue
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </div>
          </form>
        )}

        {/* ── STEP 1: Marks ── */}
        {!loading && step === 1 && (
          <form className="ss-form" onSubmit={handleFinalSubmit}>
            <p className="ss-form-hint">Enter your marks for each level. Leave blank if not applicable.</p>
            <div className="ss-form-grid">
              {[
                { label: "Class 10 Marks (%)", name: "marks10" },
                { label: "Class 11 Marks (%)", name: "marks11" },
                { label: "Class 12 Marks (%)", name: "marks12" },
                { label: "Undergraduate Marks (%)", name: "marksUG" },
                { label: "Postgraduate Marks (%)", name: "marksPG" },
              ].map(({ label, name }) => (
                <div className="ss-field" key={name}>
                  <label className="ss-label">{label}</label>
                  <input className="ss-input" type="number" name={name} min="0" max="100"
                    value={form[name] || ""} onChange={handleChange} placeholder="0 – 100" />
                </div>
              ))}
            </div>

            <div className="ss-form-footer">
              <button type="button" className="ss-btn ss-btn--ghost" onClick={() => setStep(0)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                Back
              </button>
              <button type="submit" className="ss-btn ss-btn--primary">
                Find Scholarships
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              </button>
            </div>
          </form>
        )}

        {/* ── STEP 2: Results ── */}
        {!loading && step === 2 && (
          <div className="ss-results">
            <div className="ss-results-header">
              <div>
                <h2 className="ss-results-title">
                  {eligibleScholarships.length > 0
                    ? `${eligibleScholarships.length} Scholarship${eligibleScholarships.length > 1 ? "s" : ""} Found`
                    : "No matches found"}
                </h2>
                <p className="ss-results-sub">
                  {eligibleScholarships.length > 0
                    ? "Based on your eligibility profile"
                    : "Try adjusting your details or explore all scholarships."}
                </p>
              </div>
              <button className="ss-btn ss-btn--ghost" onClick={handleReset}>Search Again</button>
            </div>

            {eligibleScholarships.length === 0 ? (
              <div className="ss-no-results">
                <div className="ss-no-results-icon">🔍</div>
                <p>No scholarships matched your criteria.</p>
                <button className="ss-btn ss-btn--primary" onClick={handleReset}>Try Again</button>
              </div>
            ) : (
              <div className="ss-cards">
                {eligibleScholarships.map((sch, idx) => (
                  <div className="ss-card" key={idx}>
                    <div className="ss-card-top">
                      <div>
                        <h3 className="ss-card-name">{sch.name}</h3>
                        <div className="ss-card-amount">{sch.amount}</div>
                      </div>
                      <span className="ss-card-badge">Eligible</span>
                    </div>

                    <div className="ss-card-body">
                      <div className="ss-card-section">
                        <span className="ss-card-section-label">Eligibility</span>
                        <span className="ss-card-section-val">
                          Income ≤ ₹{sch.eligibility.maxIncome.toLocaleString()} · {sch.eligibility.studyLevel.join(", ")}
                        </span>
                      </div>
                      <div className="ss-card-section">
                        <span className="ss-card-section-label">Documents</span>
                        <div className="ss-doc-tags">
                          {sch.documents.map((doc, i) => (
                            <span className="ss-doc-tag" key={i}>{doc}</span>
                          ))}
                        </div>
                      </div>
                      {sch.eligibility.other && (
                        <div className="ss-card-section">
                          <span className="ss-card-section-label">Note</span>
                          <span className="ss-card-section-val">{sch.eligibility.other}</span>
                        </div>
                      )}
                    </div>

                    <div className="ss-card-footer">
                      <a href={sch.link} target="_blank" rel="noopener noreferrer" className="ss-apply-btn">
                        Apply Now
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                          <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ScholarshipApp;