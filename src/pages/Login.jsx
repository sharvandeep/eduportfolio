import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const studentCredentials = [
  { user_id: "2400032427", password: "32427" },
  { user_id: "2400032382", password: "32382" },
  { user_id: "2400032309", password: "32309" },
  { user_id: "2400031154", password: "31154" },
  { user_id: "2400032310", password: "32310" },
  { user_id: "2400030606", password: "30606" },
  { user_id: "2400031181", password: "31181" },
];
const facultyCredentials = [
  { user_id: "1234", password: "4321" },
  { user_id: "5678", password: "8765" },
  { user_id: "9123", password: "3219" }
];

const Login = () => {
  const [role, setRole] = useState("Student");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (
      role === "Student" &&
      studentCredentials.some(x => x.user_id === userId && x.password === password)
    ) {
      localStorage.setItem("currentStudentId", userId);
      navigate("/student");
    } else if (
      role === "Faculty" &&
      facultyCredentials.some(x => x.user_id === userId && x.password === password)
    ) {
      localStorage.setItem("currentFacultyId", userId);
      navigate("/faculty");
    } else {
      setError("Invalid credentials!");
    }
  };

  return (
    <div className="login-super-bg">
      <div className="login-headerbar">
        <div className="login-header-logo">EP</div>
        <div className="login-header-title">EduPortpolia</div>
      </div>
      <div className="login-bg">
        <div className="login-board">
          <div className="role-board">
            <div className={`role-col${role === "Student" ? " active" : ""}`} onClick={() => setRole("Student")}>
              <button className="role-btn">Student</button>
              <div className="role-desc">Upload, track, and manage milestones</div>
            </div>
            <div className={`role-col${role === "Faculty" ? " active" : ""}`} onClick={() => setRole("Faculty")}>
              <button className="role-btn">Faculty</button>
              <div className="role-desc">Review submissions and give feedback</div>
            </div>
          </div>
          <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="userid">User ID</label>
            <input id="userid" type="text" value={userId} onChange={e => setUserId(e.target.value)} required autoComplete="username" />
            <label htmlFor="password">Password</label>
            <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required autoComplete="current-password" />
            <div className="form-note">
              Press Enter to submit • Role determines destination
            </div>
            <button type="submit" className="submit-btn">Login</button>
            {error && <div className="error">{error}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
