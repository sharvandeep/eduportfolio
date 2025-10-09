import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const roomMap = {
  101: ["2400032427", "240002309"],
  102: ["2400032382", "2400031181"],
  201: ["2400032310", "2400030606"]
};
const allRooms = [101, 102, 201];

export default function FacultyDashboard() {
  const [activeRoom, setActiveRoom] = useState(101);
  const navigate = useNavigate();

  // Safe navigation for numeric student ID
  const safeNavigate = (path) => {
    // Accept only valid number IDs for navigation, otherwise show alert
    const idCandidate = path.split("/").filter(Boolean).pop();
    if (/^[0-9]+$/.test(idCandidate)) {
      navigate(path);
    } else {
      alert("Invalid student ID");
    }
  };

  const gotoProjects = (id) => {
    if (typeof id === "string" && id.trim().length > 0) {
      safeNavigate(`/faculty/student/${id}/projects`);
    } else {
      alert("Invalid student ID");
    }
  };
  const gotoPortfolio = (id) => {
    if (typeof id === "string" && id.trim().length > 0) {
      safeNavigate(`/faculty/student/${id}/portfolio`);
    } else {
      alert("Invalid student ID");
    }
  };
  // No navigation! Just a message
  const showEvaluateMessage = () => {
    alert("Evaluation/feedback functionality is not available for this student.");
  };
  const logout = () => {
    localStorage.removeItem("currentFacultyId");
    navigate("/login", { replace: true });
  };

  return (
    <div style={{ background: "#f6faff", minHeight: "100vh", padding: 0, fontFamily: "Segoe UI, Arial, sans-serif" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#f7fafd", height: 60, padding: "0 40px", boxShadow: "0 2px 8px rgba(0,0,0,.03)" }}>
        <div style={{ fontSize: "1.4rem", color: "#2c3e50", fontWeight: 700, letterSpacing: "1px" }}>EduPortpolia</div>
        <button onClick={logout} style={{ background: "#fff", color: "#1c5ef4", border: "2px solid #1c5ef4", fontSize: "1rem", borderRadius: 20, padding: "8px 26px", cursor: "pointer" }}>
          Logout
        </button>
      </header>

      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "2.5rem 4vw" }}>
        <div style={{ fontWeight: 800, fontSize: "2.3rem", color: "#192347", margin: "1.8rem 0 .8rem 0" }}>Faculty Dashboard</div>
        <div style={{ display: "flex", gap: "1.4rem", marginBottom: "2.3rem" }}>
          {allRooms.map((room) => (
            <div key={room}
              onClick={() => setActiveRoom(room)}
              style={{
                flex: 1,
                background: activeRoom === room ? "#e7f3ff" : "#fff",
                border: activeRoom === room ? "2px solid #3777fe" : "2px solid #d2e5fd",
                borderRadius: "1.15rem",
                boxShadow: activeRoom === room ? "0 8px 28px #3777fe18" : "0 4px 16px #b7d0fd10",
                padding: "1.3rem 0",
                fontWeight: 800,
                fontSize: "1.45rem",
                color: "#15348b",
                textAlign: "center",
                cursor: "pointer",
                transition: "box-shadow .13s, background .16s, border-color .16s"
              }}>
              {room}
            </div>
          ))}
        </div>
        <div style={{ background: "#fff", borderRadius: "1.2rem", padding: "2.2rem 2.5rem", boxShadow: "0 4px 24px #b7d0fd15", minHeight: 160 }}>
          <div style={{ fontWeight: 700, fontSize: "1.18rem", color: "#2654ad", marginBottom: "1.7rem" }}>
            Students in Room {activeRoom}
          </div>
          {roomMap[activeRoom].map((id) => (
            <div key={id} style={{
              display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.2rem",
              borderRadius: "0.95rem", background: "#f6faff", padding: "1.07rem 1.5rem"
            }}>
              <div style={{ fontWeight: 600, fontSize: "1.12rem", color: "#24365a" }}>{id}</div>
              <div style={{ display: "flex", gap: "0.8rem", flexWrap: "wrap" }}>
                <button onClick={() => gotoProjects(id)} style={{ background: "#3777fe", color: "#fff", border: "none", borderRadius: "0.8rem", padding: "0.65rem 1.2rem", fontWeight: 700, fontSize: "1.02rem", cursor: "pointer" }}>View Projects</button>
                <button onClick={() => gotoPortfolio(id)} style={{ background: "#6a5acd", color: "#fff", border: "none", borderRadius: "0.8rem", padding: "0.65rem 1.2rem", fontWeight: 700, fontSize: "1.02rem", cursor: "pointer" }}>View Portfolio</button>
                <button onClick={showEvaluateMessage} style={{ background: "#19b94b", color: "#fff", border: "none", borderRadius: "0.8rem", padding: "0.65rem 1.2rem", fontWeight: 700, fontSize: "1.02rem", cursor: "pointer" }}>Evaluate & Feedback</button>
              </div>
            </div>
          ))}
        </div>
        <div style={{ background: "#fff", borderRadius: "1.2rem", minHeight: "2.1rem", marginTop: "2.7rem", boxShadow: "0 8px 24px #b7d0fd29" }} />
      </div>
    </div>
  );
}
