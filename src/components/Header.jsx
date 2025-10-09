import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Header() {
  const [hovered, setHovered] = useState('');
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { to: "/student", label: "Home" },
    { to: "/projects", label: "Projects" },
    { to: "/portfolios", label: "Portfolios" },
    { to: "/feedback", label: "Feedback" }
  ];

  const buttonBase = {
    fontWeight: 600,
    fontSize: "1.14rem",
    borderRadius: "1.23rem",
    padding: "0.68rem 2.1rem",
    marginRight: "0.6rem",
    border: "none",
    background: "#f8fbff",
    color: "#2548a2",
    textDecoration: "none",
    boxShadow: "0 6px 30px #3777fe17, 0 2.8px 16px #b7d0fd20",
    cursor: "pointer",
    transition: "background 0.14s, color 0.14s, box-shadow 0.2s, transform 0.19s"
  };
  const buttonActive = {
    background: "#e7f3ff",
    color: "#3777fe",
    boxShadow: "0 12px 36px 4px #3777fe2b, 0 8px 32px #90aaff11",
    transform: "translateY(-2px) scale(1.038)"
  };

  const handleLogout = () => navigate("/login");
  const handleNewProject = () => navigate("/upload");  // Crucial: redirects to upload

  return (
    <header style={{
      width: "100%",
      padding: "1rem 4vw",
      display: "flex",
      alignItems: "center",
      background: "#f6faff",
      borderBottom: "1px solid #e5e7eb",
      position: "sticky",
      top: 0,
      zIndex: 100,
      boxSizing: "border-box"
    }}>
      <div style={{
        fontWeight: 700,
        fontSize: "1.35rem",
        color: "#2548a2",
        marginRight: "2.3rem",
        display: "flex",
        alignItems: "center"
      }}>
        <span style={{
          background: "linear-gradient(90deg,#3777fe 50%,#64adea 100%)",
          borderRadius: "12px",
          color: "#fff",
          padding: "0.36rem 1rem",
          fontWeight: 800,
          marginRight: "0.8rem",
          fontSize: "1.08rem"
        }}>EP</span>
        EduPortpolia
      </div>
      <nav style={{ display: "flex", alignItems: "center", gap: "2.1rem", flexGrow: 1 }}>
        {navLinks.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            style={{
              ...buttonBase,
              ...(hovered === to || location.pathname === to ? buttonActive : {})
            }}
            onMouseEnter={() => setHovered(to)}
            onMouseLeave={() => setHovered('')}
          >
            {label}
          </Link>
        ))}
      </nav>
      <div style={{ display: "flex", alignItems: "center", gap: "0.9rem" }}>
        <button
          style={{
            border: "none",
            background: "#fff",
            boxShadow: "0 3px 10px #eaefff2f",
            borderRadius: "50%",
            padding: "0.45rem 0.7rem",
            cursor: "pointer",
            marginRight: "0.6rem"
          }}
          title="Notifications"
        >
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path d="M12 22c1.1 0 2-.9 2-2h-4a2 2 0 002 2zm6-6V11c0-3.1-1.66-5.64-5-6.32V4a1 1 0 10-2 0v.68C7.66 5.36 6 7.89 6 11v5l-1.29 1.29A1 1 0 006 19h12a1 1 0 00.71-1.71L18 16z" fill="#799ad4"/>
          </svg>
        </button>
        <button
          onClick={handleNewProject}
          style={{
            ...buttonBase,
            background: "#3777fe",
            color: "#fff",
            fontWeight: 700,
            fontSize: "1.18rem",
            margin: "0 0.5rem 0 0",
            boxShadow: "0 8px 32px #3777fe1c, 0 2px 12px #71a6fe19"
          }}>
          + New Project
        </button>
        <button
          onClick={handleLogout}
          style={{
            ...buttonBase,
            color: "#3777fe",
            background: "#fff",
            border: "1.5px solid #3777fe",
            fontWeight: 600,
            margin: 0,
          }}>
          Logout
        </button>
        <div style={{ position: "relative", marginLeft: "0.85rem" }}>
          <button
            onClick={() => setProfileOpen(p => !p)}
            style={{
              background: "#eaf5ff",
              borderRadius: "50%",
              fontWeight: 700,
              color: "#2548a2",
              fontSize: "1.17rem",
              width: "42px",
              height: "42px",
              border: "none",
              boxShadow: "0 2px 13px #70b0fd22",
              cursor: "pointer",
              margin: 0
            }}>
            ST
          </button>
          {profileOpen &&
            <div style={{
              position: "absolute",
              top: "120%",
              right: 0,
              background: "#fff",
              borderRadius: "0.9rem",
              boxShadow: "0 8px 24px #3777fe26, 0 1.5px 8px #b8d2fd18",
              zIndex: 200,
              minWidth: "140px",
              padding: "0.7rem 0"
            }}>
              <button
                style={{
                  width: "100%",
                  background: "none",
                  border: "none",
                  textAlign: "left",
                  padding: "0.7rem 1.5rem",
                  color: "#222",
                  fontSize: "1.11rem",
                  cursor: "pointer",
                }}
                onClick={() => {
                  navigate("/profile");
                  setProfileOpen(false);
                }}
              >My Profile</button>
            </div>
          }
        </div>
      </div>
    </header>
  );
}

export default Header;
