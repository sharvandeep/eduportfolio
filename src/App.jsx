import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/Login';
import StudentHome from './pages/StudentHome';
import Projects from './pages/Projects';
import Portfolios from './pages/Portfolios';
import UploadProject from './pages/UploadProject';
import FacultyDashboard from './pages/FacultyDashboard';
import FacultyStudentProjects from './pages/FacultyStudentProjects';
import FacultyStudentPortfolio from './pages/FacultyStudentPortfolio';
import Feedback from './pages/Feedback';
import FacultyFeedback from './pages/FacultyFeedback';

function StudentLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
function FacultyLayout() {
  return <Outlet />;
}

export default function App() {
  const [studentId, setStudentId] = useState(localStorage.getItem("currentStudentId") || "");
  const [projects, setProjects] = useState([]);
  const [portfolio, setPortfolio] = useState({
    name: "",
    headline: "",
    summary: "",
    skills: [],
    links: { github: "", linkedin: "", website: "" },
    resume: ""
  });

  useEffect(() => {
    if (studentId) {
      localStorage.setItem("currentStudentId", studentId);
      setProjects(JSON.parse(localStorage.getItem(`projects:${studentId}`)) || []);
      setPortfolio(JSON.parse(localStorage.getItem(`portfolio:${studentId}`)) || {
        name: "",
        headline: "",
        summary: "",
        skills: [],
        links: { github: "", linkedin: "", website: "" },
        resume: ""
      });
    }
  }, [studentId]);

  useEffect(() => {
    if (studentId) localStorage.setItem(`projects:${studentId}`, JSON.stringify(projects));
  }, [studentId, projects]);

  useEffect(() => {
    if (studentId) localStorage.setItem(`portfolio:${studentId}`, JSON.stringify(portfolio));
  }, [studentId, portfolio]);

  const logout = () => {
    localStorage.removeItem("currentStudentId");
    setStudentId("");
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setStudentId={setStudentId} />} />

        <Route element={<StudentLayout />}>
          <Route path="/student" element={<StudentHome projects={projects} />} />
          <Route path="/projects" element={<Projects projects={projects} />} />
          <Route path="/portfolios" element={<Portfolios portfolio={portfolio} setPortfolio={setPortfolio} />} />
          <Route path="/upload" element={<UploadProject setProjects={setProjects} projects={projects} />} />
            <Route path="/feedback" element={<Feedback />} />
              <Route path="/faculty/feedback" element={<FacultyFeedback />} /> {/* NEW */}


        </Route>

        <Route element={<FacultyLayout />}>
          <Route path="/faculty" element={<FacultyDashboard />} />
          <Route path="/faculty/student/:id/projects" element={<FacultyStudentProjects />} />
          <Route path="/faculty/student/:id/portfolio" element={<FacultyStudentPortfolio />} />
            <Route path="/faculty/feedback" element={<FacultyFeedback />} /> 
            <Route path="/faculty/feedback/:id" element={<FacultyFeedback />} />

          
        </Route>

        <Route path="*" element={<Navigate to={studentId ? "/student" : "/login"} replace />} />
      </Routes>
    </Router>
  );
}
