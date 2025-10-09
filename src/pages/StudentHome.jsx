import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// FLOATING/SHADOW STYLES
const floatShadow = {
  boxShadow: "0 6px 30px 0 #3777fe23, 0 2px 18px #a1cbff11",
  transition: "box-shadow 0.18s, transform 0.15s, background 0.17s"
};
const floatGlow = {
  boxShadow: "0 15px 56px 5px #3777fe3b, 0 8px 32px #a1cbff23",
  transform: "scale(1.025)",
  background: "#f6faff"
};

// Simple calendar with floating/glow
function SimpleCalendar() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [hovered, setHovered] = useState(false);

  // Days in month
  const monthDays = new Date(year, month + 1, 0).getDate();
  const startDay = new Date(year, month, 1).getDay();

  let days = [];
  for (let i = 0; i < startDay; i++) days.push("");
  for (let d = 1; d <= monthDays; d++) days.push(d);

  let weeks = [];
  for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7));

  const monthsStr = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "1.15rem",
        padding: "2.1rem 1.5rem 2rem 1.5rem",
        minWidth: "316px",
        ...floatShadow,
        ...(hovered ? floatGlow : {})
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{
        fontWeight: 700,
        fontSize: "1.13rem",
        color: "#223a5e",
        marginBottom: "1.3rem",
        display: "flex", alignItems: "center", justifyContent: "space-between"
      }}>
        <button onClick={() => setMonth((m) => m === 0 ? 11 : m - 1)} style={{
          background: "#f8fbff", border: "none", borderRadius: "0.7rem", padding: "0.2rem 1rem", cursor: "pointer"
        }}>&lt;</button>
        {monthsStr[month]} {year}
        <button onClick={() => setMonth((m) => m === 11 ? 0 : m + 1)} style={{
          background: "#f8fbff", border: "none", borderRadius: "0.7rem", padding: "0.2rem 1rem", cursor: "pointer"
        }}>&gt;</button>
      </div>
      <table style={{
        width: "100%",
        textAlign: "center",
        fontSize: "1.03rem",
        color: "#223a5e",
        background: "#f8fbff",
        borderRadius: "1rem",
        margin: "0 auto 1rem auto"
      }}>
        <thead>
          <tr>
            <th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th>
            <th>Thu</th><th>Fri</th><th>Sat</th>
          </tr>
        </thead>
        <tbody>
          {weeks.map((row, i) => (
            <tr key={i}>
              {row.map((d, j) => (
                <td key={j} style={{
                  background: String(d) === String(today.getDate()) && month === today.getMonth() && year === today.getFullYear() ? "#3777fe" : "",
                  color: String(d) === String(today.getDate()) && month === today.getMonth() && year === today.getFullYear() ? "#fff" : undefined,
                  borderRadius: String(d) === String(today.getDate()) ? "1em" : "0.4em",
                  fontWeight: String(d) === String(today.getDate()) ? 700 : 400,
                  padding: "0.5em"
                }}>{d || ""}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button style={{
        width: "100%",
        fontWeight: 700,
        fontSize: "1.13rem",
        color: "#223a5e",
        background: "#f8fbff",
        border: "none",
        borderRadius: "1rem",
        padding: "0.9rem 0",
        marginTop: "0.7rem"
      }}>All Students</button>
    </div>
  );
}

export default function StudentHome({ projects = [] }) {
  const [hoverCard, setHoverCard] = useState(null);
  const navigate = useNavigate();
  // Get the logged-in user's id
  const userId = localStorage.getItem("currentStudentId");

  return (
    <div style={{
      maxWidth: 1320,
      margin: "0 auto",
      padding: "0 4vw",
      background: "#f6faff",
      minHeight: "100vh"
    }}>
      <h1 style={{ fontWeight: 800, fontSize: "2.45rem", color: "#1a233b", margin: "2.2rem 0 0.7rem 0" }}>
        Welcome back, {userId}!
      </h1>
      <div style={{ color: "#6372a8", fontSize: "1.17rem", marginBottom: "2.0rem" }}>
        Here’s what’s happening with projects today.
      </div>
      <div style={{ display: "flex", gap: "2.1rem", marginBottom: "3.4rem" }}>
        {[
          { label: "Active projects", value: projects.length, color: "#17233b" },
          { label: "Portfolios", value: 0, color: "#17233b" },
          { label: "Performance", value: "On track", color: "#19b94b" }
        ].map((c) => (
          <div
            key={c.label}
            style={{
              flex: 1,
              background: "#fff",
              borderRadius: "1.13rem",
              padding: "2.3rem 2.2rem",
              ...floatShadow,
              ...(hoverCard === c.label ? floatGlow : {})
            }}
            onMouseEnter={() => setHoverCard(c.label)}
            onMouseLeave={() => setHoverCard(null)}
          >
            <div style={{ color: "#8c99b5", fontSize: "1.09rem", marginBottom: "1.1rem" }}>{c.label}</div>
            <div style={{
              fontWeight: 700,
              fontSize: "2.3rem",
              color: c.label === "Performance" ? "#19b94b" : "#17233b"
            }}>{c.value}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: "2.2rem" }}>
        <div style={{ flex: 2, minWidth: 400 }}>
          <div style={{ fontWeight: 700, fontSize: "1.29rem", color: "#223a5e", marginBottom: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            My Projects
            <button
              style={{
                background: "#3777fe",
                color: "#fff",
                border: "none",
                borderRadius: "0.7rem",
                padding: "0.7rem 1.7rem",
                marginLeft: "1rem",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "1.09rem"
              }}
              onClick={() => navigate("/upload")}
            >+ New Project</button>
          </div>
          {projects.length === 0 && (
            <div style={{ color: "#aaa", marginTop: "2rem" }}>
              No projects yet. Click <b>+ New Project</b> to add one.
            </div>
          )}
          {projects.map((proj, idx) => (
            <div
              key={idx}
              style={{
                background: "#fff",
                borderRadius: "1.13rem",
                padding: "1.5rem 2rem",
                marginBottom: "1.25rem",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                ...floatShadow,
                ...(hoverCard === `p${idx}` ? floatGlow : {})
              }}
              onMouseEnter={() => setHoverCard(`p${idx}`)}
              onMouseLeave={() => setHoverCard(null)}
            >
              <div>
                <div style={{ fontWeight: 700, fontSize: "1.22rem", marginBottom: "0.3rem" }}>{proj.title}</div>
                <div style={{ color: "#6c7397", fontSize: "1.09rem", marginBottom: "0.7rem" }}>{proj.desc}</div>
                <ul style={{ margin: "0.7rem 0 0.7rem 1.12rem", color: "#5277fe", fontSize: "1rem" }}>
                  {(proj.files || []).map((f, fidx) => (
                    <li key={fidx}>{f}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        <div style={{ flex: 1 }}>
          <SimpleCalendar />
        </div>
      </div>
    </div>
  );
}
