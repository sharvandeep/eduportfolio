// Portfolios.jsx
import React, { useEffect, useMemo, useState } from "react";

// Props:
// - portfolio: object held in parent state
// - setPortfolio: setter from parent
// - studentId: optional; if not provided we read "currentStudentId" from localStorage
export default function Portfolios({ portfolio, setPortfolio, studentId: studentIdProp }) {
  const [skillInput, setSkillInput] = useState("");
  const [isEditing, setIsEditing] = useState(true);
  const [status, setStatus] = useState("");

  // Determine student id
  const studentId = useMemo(
    () => studentIdProp || localStorage.getItem("currentStudentId") || "anonymous",
    [studentIdProp]
  );

  const storageKey = useMemo(() => `portfolio:${studentId}`, [studentId]);

  // Load any saved portfolio on mount or when student changes
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const saved = JSON.parse(raw);
        setPortfolio((prev) => ({ ...prev, ...saved }));
        setStatus("Loaded saved data");
        setTimeout(() => setStatus(""), 1400);
      }
    } catch {
      setStatus("Failed to load");
      setTimeout(() => setStatus(""), 1400);
    }
  }, [storageKey, setPortfolio]);

  // Optional: request persistent storage to reduce eviction risk
  useEffect(() => {
    navigator.storage?.persist?.().catch(() => {});
  }, []);

  function handleChange(e) {
    if (!isEditing) return;
    const { name, value } = e.target;
    if (["github", "linkedin", "website"].includes(name)) {
      setPortfolio({ ...portfolio, links: { ...portfolio.links, [name]: value } });
    } else {
      setPortfolio({ ...portfolio, [name]: value });
    }
  }

  function handleSkillAdd() {
    if (!isEditing) return;
    if (skillInput.trim() && !portfolio.skills.includes(skillInput.trim())) {
      setPortfolio({ ...portfolio, skills: [...portfolio.skills, skillInput.trim()] });
    }
    setSkillInput("");
  }

  function handleSkillRemove(idx) {
    if (!isEditing) return;
    setPortfolio({ ...portfolio, skills: portfolio.skills.filter((_, i) => i !== idx) });
  }

  function handleResume(e) {
    if (!isEditing) return;
    const file = e.target.files?.[0];
    setPortfolio({ ...portfolio, resume: file ? file.name : null });
  }

  function handleSave() {
    try {
      const trimmed = {
        ...portfolio,
        name: (portfolio.name || "").trim(),
        headline: (portfolio.headline || "").trim(),
        summary: (portfolio.summary || "").trim(),
        skills: (portfolio.skills || []).map((s) => s.trim()),
        links: {
          github: (portfolio.links.github || "").trim(),
          linkedin: (portfolio.links.linkedin || "").trim(),
          website: (portfolio.links.website || "").trim()
        }
      };
      localStorage.setItem(storageKey, JSON.stringify(trimmed));
      setStatus("Saved");
      setTimeout(() => setStatus(""), 1400);
      setPortfolio(trimmed);
      setIsEditing(false);
    } catch {
      setStatus("Save failed");
      setTimeout(() => setStatus(""), 1400);
    }
  }

  function handleLoad() {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) setPortfolio(JSON.parse(raw));
      setIsEditing(false);
      setStatus(raw ? "Loaded" : "Nothing saved");
      setTimeout(() => setStatus(""), 1400);
    } catch {
      setStatus("Load failed");
      setTimeout(() => setStatus(""), 1400);
    }
  }

  function handleClear() {
    try {
      localStorage.removeItem(storageKey);
      setStatus("Cleared");
      setTimeout(() => setStatus(""), 1400);
    } catch {
      setStatus("Clear failed");
      setTimeout(() => setStatus(""), 1400);
    }
  }

  return (
    <div style={{
      maxWidth: "1400px",
      margin: "3.5rem auto",
      display: "flex",
      gap: "3.6rem",
      alignItems: "flex-start",
      background: "linear-gradient(112deg, #ecf4ff 60%, #d5e0f7 100%)",
      borderRadius: "2.2rem",
      boxShadow: "0 14px 56px #3777fe23, 0 8px 22px #a1cbff16",
      padding: "3rem"
    }}>
      {/* Left: Edit Form */}
      <div style={{
        flex: 1.05,
        background: "rgba(255,255,255,0.82)",
        borderRadius: "1.5rem",
        padding: "2.6rem 2.55rem 2.1rem 2.2rem",
        boxShadow: "0 8px 45px #3777fe17",
        backdropFilter: "blur(6px)"
      }}>
        <div style={{ display: "flex", gap: "0.6rem", alignItems: "center", marginBottom: "1rem" }}>
          <span style={{ fontWeight: 800, color: "#2340a0" }}>
            {isEditing ? "Editing" : "View"}
          </span>
          <button type="button" onClick={() => setIsEditing((v) => !v)} style={{
            marginLeft: "auto",
            background: isEditing ? "#e9f1ff" : "#3777fe",
            color: isEditing ? "#2340a0" : "#fff",
            border: "2px solid #3777fe",
            borderRadius: "0.9rem",
            padding: "0.5rem 1rem",
            fontWeight: 800,
            cursor: "pointer"
          }}>
            {isEditing ? "Done" : "Edit"}
          </button>
          <button type="button" onClick={handleSave} style={{
            background: "linear-gradient(90deg,#3b82ff,#3ec6ff)",
            color: "#fff",
            border: "none",
            borderRadius: "0.9rem",
            fontWeight: 800,
            padding: "0.5rem 1.2rem",
            cursor: "pointer"
          }}>
            Save
          </button>
          <button type="button" onClick={handleLoad} style={{
            background: "#eef4ff",
            color: "#2340a0",
            border: "2px solid #b7d2fe",
            borderRadius: "0.9rem",
            fontWeight: 800,
            padding: "0.5rem 1.2rem",
            cursor: "pointer"
          }}>
            Load
          </button>
          <button type="button" onClick={handleClear} style={{
            background: "#ffecef",
            color: "#b4232a",
            border: "2px solid #f3c3c8",
            borderRadius: "0.9rem",
            fontWeight: 800,
            padding: "0.5rem 1.2rem",
            cursor: "pointer"
          }}>
            Clear
          </button>
          <span style={{ marginLeft: "8px", color: "#16a34a", fontWeight: 700 }}>{status}</span>
        </div>

        <h2 style={{
          fontWeight: 900,
          fontSize: "2rem",
          marginBottom: "2.25rem",
          color: "rgb(35, 63, 160)",
          letterSpacing: "1px"
        }}>Edit your details</h2>

        <label style={{ fontWeight: 700, fontSize: "1.18rem", color: "#2548a6" }}>Full name</label>
        <input
          type="text"
          name="name"
          value={portfolio.name}
          onChange={handleChange}
          disabled={!isEditing}
          placeholder="Your full name"
          style={{
            width: "100%", marginBottom: "1.46rem", marginTop: "0.32rem",
            borderRadius: "1.05rem", padding: "0.7rem 1.25rem",
            border: "2px solid #b7d2fe", fontSize: "1.13rem", boxShadow: "0 3px 11px #e4edff92"
          }}
        />

        <label style={{ fontWeight: 700, fontSize: "1.18rem", color: "#2548a6" }}>Headline</label>
        <input
          type="text"
          name="headline"
          value={portfolio.headline}
          onChange={handleChange}
          disabled={!isEditing}
          placeholder="e.g., Frontend Developer"
          style={{
            width: "100%", marginBottom: "1.46rem", marginTop: "0.32rem",
            borderRadius: "1.05rem", padding: "0.7rem 1.25rem",
            border: "2px solid #b7d2fe", fontSize: "1.13rem", boxShadow: "0 3px 11px #e4edff92"
          }}
        />

        <label style={{ fontWeight: 700, fontSize: "1.18rem", color: "#2548a6" }}>Summary</label>
        <textarea
          name="summary"
          value={portfolio.summary}
          onChange={handleChange}
          disabled={!isEditing}
          placeholder="Short bio, focus areas, and goals"
          style={{
            width: "100%", minHeight: "95px", borderRadius: "1.1rem",
            marginBottom: "1.7rem", padding: "1.18rem",
            border: "2px solid #b7d2fe", fontSize: "1.13rem", boxShadow: "0 3px 11px #e4edff92"
          }}
        />

        <label style={{ fontWeight: 700, fontSize: "1.18rem", color: "#2548a6" }}>Skills</label>
        <div style={{ display: "flex", gap: "0.7rem", margin: "0.6rem 0" }}>
          <input
            type="text"
            value={skillInput}
            disabled={!isEditing}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleSkillAdd())}
            placeholder="Type a skill and press Add or enter"
            style={{
              flex: 1, borderRadius: "0.97rem", padding: "0.57rem 1.25rem",
              border: "2px solid #b7d2fe", fontSize: "1.13rem"
            }}
          />
          <button type="button" onClick={handleSkillAdd} disabled={!isEditing} style={{
            background: "linear-gradient(90deg,#3b82ff,#3ec6ff)",
            color: "#fff", border: "none", borderRadius: "0.9rem",
            fontWeight: 800, fontSize: "1.09rem", cursor: "pointer",
            padding: "0.60rem 1.7rem", boxShadow: "0 4px 16px #6ad8ffd4",
            opacity: isEditing ? 1 : 0.6
          }}>Add</button>
        </div>
        <div style={{ marginBottom: "1.32rem", display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
          {portfolio.skills.map((s, idx) => (
            <span
              key={s + idx}
              style={{
                background: "linear-gradient(90deg,#e1eafe 0%,#d4f1f6 100%)",
                color: "#1961b2",
                padding: "0.53rem 1.27rem",
                borderRadius: "18px",
                fontWeight: 800,
                fontSize: "1.05rem",
                cursor: isEditing ? "pointer" : "default",
                boxShadow: "0 2px 6px #cdf0fe57"
              }}
              onClick={() => isEditing && handleSkillRemove(idx)}
              title={isEditing ? "Remove skill" : ""}
            >{s} ×</span>
          ))}
        </div>
        <small style={{ color: "#7f8ba5", marginBottom: "1.2rem", display: "block", fontSize: "1.01rem" }}>
          Tip: Keep skills concise and grouped by relevance; click to remove chips any time.
        </small>

        <label style={{ fontWeight: 700, fontSize: "1.18rem", color: "#2548a6", marginTop: "0.5rem" }}>Links</label>
        <input
          type="text"
          name="github"
          value={portfolio.links.github}
          onChange={handleChange}
          disabled={!isEditing}
          placeholder="GitHub URL"
          style={{ width: "100%", marginBottom: "1rem", marginTop: "0.7rem", borderRadius: "0.9rem", padding: "0.6rem 1.1rem", border: "2px solid #b7d2fe", fontSize: "1.07rem" }}
        />
        <input
          type="text"
          name="linkedin"
          value={portfolio.links.linkedin}
          onChange={handleChange}
          disabled={!isEditing}
          placeholder="LinkedIn URL"
          style={{ width: "100%", marginBottom: "1rem", borderRadius: "0.9rem", padding: "0.6rem 1.1rem", border: "2px solid #b7d2fe", fontSize: "1.07rem" }}
        />
        <input
          type="text"
          name="website"
          value={portfolio.links.website}
          onChange={handleChange}
          disabled={!isEditing}
          placeholder="Personal website/portfolio URL"
          style={{ width: "100%", marginBottom: "1.2rem", borderRadius: "0.9rem", padding: "0.6rem 1.1rem", border: "2px solid #b7d2fe", fontSize: "1.07rem" }}
        />

        <label style={{ fontWeight: 700, fontSize: "1.18rem", color: "#2548a6", display: "block", marginTop: "1.2rem" }}>Resume</label>
        <input
          type="file"
          onChange={handleResume}
          disabled={!isEditing}
          style={{ marginTop: "0.7rem", marginBottom: "1.35rem", fontSize: "1.08rem" }}
        />
      </div>

      {/* Right: Live Preview */}
      <div style={{
        flex: 1,
        background: "rgba(255,255,255,0.93)",
        borderRadius: "1.5rem",
        padding: "2.85rem 2.2rem 2.4rem 2.2rem",
        boxShadow: "0 5px 44px #3777fe29",
        border: "1.8px solid #eaf2fd",
        position: "relative",
        minHeight: "630px"
      }}>
        <div style={{
          position: "absolute",
          top: "-32px",
          right: "36px",
          background: "linear-gradient(90deg,#74b0ff 0%,#38b0fa 100%)",
          color: "#fff",
          padding: "0.52rem 2.12rem",
          fontWeight: 800,
          fontSize: "1.13rem",
          borderRadius: "1.57rem",
          boxShadow: "0 7px 18px #60b8ff74",
          letterSpacing: "1px"
        }}>
          Preview
        </div>
        <h2 style={{
          fontWeight: 800,
          fontSize: "2.15rem",
          color: "#264ec5",
          marginBottom: "0.4rem",
          textShadow: "0 2px 12px #60b8ff33"
        }}>
          {portfolio.name || "Your Name"}
        </h2>
        <p style={{color: "#5c6495", fontWeight: 600, marginBottom: "0.90rem", fontSize: "1.13rem"}}>
          {portfolio.headline || <span style={{ color: "#abb4d6" }}>Role</span>}
          {portfolio.headline && <span style={{ color: "#93a1bc" }}> • Focus Areas</span>}
        </p>
        <div style={{marginBottom: "1.43rem"}}>
          <b style={{ fontSize: "1.12rem", color: "#235889" }}>About</b>
          <div style={{
            margin: "8px 0 16px 0", color: "#222b42", fontSize: "1.08rem",
            background: "#f4f7ffb3", borderRadius: "0.7rem", padding: "0.8rem 1.1rem"
          }}>
            {portfolio.summary || <span style={{ color: "#bbbec8" }}>Write a short summary about strengths, interests, and goals.</span>}
          </div>
        </div>
        <div style={{marginBottom: "1.43rem"}}>
          <b style={{ fontSize: "1.12rem", color: "#235889" }}>Skills</b>
          <div style={{
            margin: "8px 0 12px 0", color: "#215ac5", fontSize: "1.09rem",
            background: "#eaf5fd", borderRadius: "0.7rem", padding: "0.59rem 1.03rem"
          }}>
            {portfolio.skills.length > 0 ? portfolio.skills.join(", ") : <span style={{ color: "#bbbec8" }}>No skills listed.</span>}
          </div>
        </div>
        <div style={{marginBottom: "1.43rem"}}>
          <b style={{ fontSize: "1.12rem", color: "#235889" }}>Resume</b>
          <div style={{
            margin: "8px 0 15px 0", color: "#21304b", fontSize: "1.09rem",
            background: "#f4f7ffb3", borderRadius: "0.7rem", padding: "0.62rem 1rem"
          }}>
            {portfolio.resume ? portfolio.resume : <span style={{ color: "#bbbec8" }}>No resume selected.</span>}
          </div>
        </div>
        <div>
          <b style={{ fontSize: "1.12rem", color: "#235889" }}>Links</b>
          <div style={{
            margin: "8px 0 0 0", fontSize: "1.06rem", color: "#164bbc",
            background: "#ebf2ffe6", borderRadius: "0.7rem", padding: "0.61rem 1rem"
          }}>
            {portfolio.links.github && <div>GitHub: <a href={portfolio.links.github} style={{ color: "#3777fe", fontWeight: 700 }}>{portfolio.links.github}</a></div>}
            {portfolio.links.linkedin && <div>LinkedIn: <a href={portfolio.links.linkedin} style={{ color: "#3777fe", fontWeight: 700 }}>{portfolio.links.linkedin}</a></div>}
            {portfolio.links.website && <div>Website: <a href={portfolio.links.website} style={{ color: "#3777fe", fontWeight: 700 }}>{portfolio.links.website}</a></div>}
            {!portfolio.links.github && !portfolio.links.linkedin && !portfolio.links.website &&
              <span style={{ color: "#bbbec8" }}>No links added.</span>
            }
          </div>
        </div>
      </div>
    </div>
  );
}
