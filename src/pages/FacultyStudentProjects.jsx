import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const FacultyStudentProjects = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.heading}>📂 Projects of Student {id}</h2>
        <p style={styles.text}>
          Here the faculty can view all projects submitted by student <b>{id}</b>.
        </p>

        <p style={{ ...styles.text, marginTop: "1rem" }}>
          (You can later display actual student projects here.)
        </p>

        <button onClick={() => navigate("/faculty")} style={styles.button}>
          ⬅ Back to Dashboard
        </button>
      </div>
    </div>
  );
};

const styles = {
  page: {
    background: "#f7faff",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "2rem",
  },
  card: {
    background: "white",
    padding: "2rem",
    borderRadius: "1rem",
    boxShadow: "0 5px 20px rgba(0,0,0,0.05)",
    textAlign: "center",
    maxWidth: "600px",
  },
  heading: {
    color: "#0d47a1",
    marginBottom: "1rem",
  },
  text: {
    color: "#333",
    fontSize: "1rem",
  },
  button: {
    marginTop: "1.5rem",
    background: "#3777fe",
    color: "white",
    border: "none",
    borderRadius: "10px",
    padding: "0.8rem 1.4rem",
    fontSize: "1rem",
    cursor: "pointer",
  },
};

export default FacultyStudentProjects;
