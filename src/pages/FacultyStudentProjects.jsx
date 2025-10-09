import React from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function FacultyStudentProjects() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Always get the array from localStorage for this ID
  let projects = [];
  try {
    projects = JSON.parse(localStorage.getItem(`projects:${id}`)) || [];
  } catch {
    projects = [];
  }

  return (
    <div style={{ maxWidth: 1100, margin: "32px auto", padding: "0 20px" }}>
      <div style={{
        display: "flex", justifyContent: "space-between",
        alignItems: "center", marginBottom: 16
      }}>
        <h2 style={{ margin: 0 }}>Projects • {id}</h2>
        <button onClick={() => navigate(-1)}
          style={{
            border: "1px solid #cbd5e1", padding: "8px 14px",
            borderRadius: 8, background: "#fff"
          }}>
          Back
        </button>
      </div>
      {projects.length === 0 && (
        <div style={{ color: "#475569" }}>No projects found for this student.</div>
      )}
      {projects.map((p, idx) => (
        <div key={p.id || idx}
          style={{
            background: "#fff", border: "1px solid #e5e7eb",
            borderRadius: 12, padding: 16, marginBottom: 12
          }}>
          <div style={{
            display: "flex", justifyContent: "space-between",
            gap: 12, alignItems: "baseline"
          }}>
            <h3 style={{ margin: 0 }}>{p.title || `Project ${idx + 1}`}</h3>
            {p.link && (
              <a href={p.link} target="_blank" rel="noreferrer"
                style={{ color: "#2563eb", fontWeight: 700 }}>
                Link
              </a>
            )}
          </div>
          <p style={{ marginTop: 8 }}>{p.description || p.desc || "No description provided."}</p>
          {p.fileName && (
            <div style={{ color: "#475569" }}>File: {p.fileName}</div>
          )}
          {p.files && p.files.length > 0 &&
            <div style={{ color: "#475569" }}>Files:
              <ul>
                {p.files.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
            </div>
          }
          {p.date && (
            <div style={{ color: "#64748b" }}>
              Submitted: {new Date(p.date).toLocaleString()}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
