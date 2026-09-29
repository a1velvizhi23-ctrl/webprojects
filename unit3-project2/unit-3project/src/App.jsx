import { useState } from "react";
import "./App.css";

function App() {
  const [students, setStudents] = useState([
    { id: 1, name: "Velvizhi", status: "Absent" },
    { id: 2, name: "Kalai", status: "Absent" },
    { id: 3, name: "Priya", status: "Absent" },
    { id: 4, name: "Divya", status: "Absent" },
    { id: 5, name: "Anu", status: "Absent" }
  ]);

  function changeStatus(id, newStatus) {
    setStudents(
      students.map((student) =>
        student.id === id
          ? { ...student, status: newStatus }
          : student
      )
    );
  }

  const total = students.length;

  const present = students.filter(
    (student) => student.status === "Present"
  ).length;

  const absent = students.filter(
    (student) => student.status === "Absent"
  ).length;

  return (
    <div className="container">

      <h1>Student Attendance Tracker</h1>

      {/* COUNT SECTION */}
      <div className="count-container">

        <div className="count-box total">
          <h2>{total}</h2>
          <p>Total Students</p>
        </div>

        <div className="count-box present">
          <h2>{present}</h2>
          <p>Present</p>
        </div>

        <div className="count-box absent">
          <h2>{absent}</h2>
          <p>Absent</p>
        </div>

      </div>

      {/* STUDENT LIST */}
      <div className="student-list">

        <h2>Student List</h2>

        {students.map((student) => (
          <div className="student" key={student.id}>

            <div>
              <h3>{student.name}</h3>

              <p>
                Status: <b>{student.status}</b>
              </p>
            </div>

            <div className="buttons">

              <button
                onClick={() =>
                  changeStatus(student.id, "Present")
                }
                className="present-btn"
              >
                Present
              </button>

              <button
                onClick={() =>
                  changeStatus(student.id, "Absent")
                }
                className="absent-btn"
              >
                Absent
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default App;

