import React from "react";
import { useParams } from "react-router-dom";

const FacultyStudentPortfolio = () => {
  const { id } = useParams();

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.heading}>🧑‍💻 Portfolio of Student {id}</h2>
        <p style={styles.text}>
          Here the faculty can view and evaluate the portfolio of student <b>{id}</b>.
        </p>
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
  },
  card: {
    background: "white",
    padding: "2rem",
    borderRadius: "1rem",
    boxShadow: "0 5px 25px rgba(0,0,0,0.05)",
    textAlign: "center",
  },
  heading: {
    color: "#6a5acd",
    marginBottom: "1rem",
  },
  text: { color: "#444" },
};

export default FacultyStudentPortfolio;
