import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";

const student = {
  name: "Velvizhi S",
  rollNo: "CS202601",
  department: "CSE - Cyber Security",
  semester: "III Semester",
  college: "Prince Dr. K. Vasudevan College of Engineering and Technology",
};

const subjects = [
  { name: "Data Structures", marks: 88 },
  { name: "Database Management System", marks: 92 },
  { name: "Web Technology", marks: 85 },
  { name: "Object Oriented Programming", marks: 90 },
  { name: "Discrete Mathematics", marks: 82 },
];

function getGrade(marks) {
  if (marks >= 90) return "A+";
  if (marks >= 80) return "A";
  if (marks >= 70) return "B+";
  if (marks >= 60) return "B";
  if (marks >= 50) return "C";
  return "F";
}

function Home() {
  return (
    <div className="page">
      <div className="hero">
        <h1>Student Report Card</h1>
        <p>
          Welcome to the Student Academic Report Card Portal
        </p>

        <Link to="/report" className="main-btn">
          View Report Card
        </Link>
      </div>

      <div className="info-grid">
        <div className="info-card">
          <h3>👨‍🎓 Student</h3>
          <p>{student.name}</p>
        </div>

        <div className="info-card">
          <h3>🎓 Department</h3>
          <p>{student.department}</p>
        </div>

        <div className="info-card">
          <h3>📚 Semester</h3>
          <p>{student.semester}</p>
        </div>
      </div>
    </div>
  );
}

function Report() {
  const total = subjects.reduce((sum, subject) => sum + subject.marks, 0);
  const average = (total / subjects.length).toFixed(2);
  const overallGrade = getGrade(Number(average));

  return (
    <div className="page">
      <div className="report-container">
        <div className="report-header">
          <div>
            <h1>Student Report Card</h1>
            <p>Academic Performance Report</p>
          </div>

          <div className="grade-box">
            <span>Overall Grade</span>
            <strong>{overallGrade}</strong>
          </div>
        </div>

        <div className="student-details">
          <div>
            <span>Student Name</span>
            <strong>{student.name}</strong>
          </div>

          <div>
            <span>Roll Number</span>
            <strong>{student.rollNo}</strong>
          </div>

          <div>
            <span>Department</span>
            <strong>{student.department}</strong>
          </div>

          <div>
            <span>Semester</span>
            <strong>{student.semester}</strong>
          </div>
        </div>

        <h2>Subject Marks</h2>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Subject</th>
                <th>Marks</th>
                <th>Grade</th>
                <th>Result</th>
              </tr>
            </thead>

            <tbody>
              {subjects.map((subject, index) => (
                <tr key={subject.name}>
                  <td>{index + 1}</td>
                  <td>{subject.name}</td>
                  <td>{subject.marks}</td>
                  <td>
                    <span className="grade">
                      {getGrade(subject.marks)}
                    </span>
                  </td>
                  <td>
                    <span className="pass">PASS</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="summary">
          <div className="summary-card">
            <span>Total Marks</span>
            <strong>{total} / 500</strong>
          </div>

          <div className="summary-card">
            <span>Average</span>
            <strong>{average}%</strong>
          </div>

          <div className="summary-card">
            <span>Overall Result</span>
            <strong className="pass-text">PASS</strong>
          </div>
        </div>

        <div className="remarks">
          <h3>Remarks</h3>
          <p>
            Excellent academic performance. Keep working hard and
            continue improving your skills.
          </p>
        </div>
      </div>
    </div>
  );
}

function About() {
  return (
    <div className="page">
      <div className="about-card">
        <h1>About Report Card</h1>

        <p>
          This Student Report Card application is created using
          React.js and React Router.
        </p>

        <div className="about-list">
          <div>✅ Student Details</div>
          <div>✅ Subject-wise Marks</div>
          <div>✅ Grade Calculation</div>
          <div>✅ Total and Average Calculation</div>
          <div>✅ Pass / Fail Result</div>
          <div>✅ React Router Navigation</div>
        </div>
      </div>
    </div>
  );
}

function NotFound() {
  return (
    <div className="page not-found">
      <h1>404</h1>
      <p>Page Not Found</p>

      <Link to="/" className="main-btn">
        Go Home
      </Link>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="app">

        <nav className="navbar">
          <div className="logo">
            🎓 Student Portal
          </div>

          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/report">Report Card</Link>
            <Link to="/about">About</Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/report" element={<Report />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <footer>
          <p>© 2026 Student Report Card | React.js</p>
        </footer>

      </div>
    </BrowserRouter>
  );
}

export default App;