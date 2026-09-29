import React, { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import "./App.css";

/* ================= SAMPLE TASKS ================= */

const initialTasks = [
  {
    id: 1,
    title: "Complete React Project",
    date: "2026-09-25",
    priority: "High",
    completed: false,
    important: true,
  },
  {
    id: 2,
    title: "Study Java",
    date: "2026-09-25",
    priority: "Medium",
    completed: true,
    important: false,
  },
  {
    id: 3,
    title: "Practice Python",
    date: "2026-09-27",
    priority: "Low",
    completed: false,
    important: true,
  },
  {
    id: 4,
    title: "Cyber Security Notes",
    date: "2026-09-28",
    priority: "High",
    completed: false,
    important: false,
  },
];

/* ================= NAVBAR ================= */

function Sidebar({ darkMode, setDarkMode }) {
  const location = useLocation();

  const menu = [
    { path: "/", icon: "🏠", name: "Dashboard" },
    { path: "/calendar", icon: "📅", name: "Calendar" },
    { path: "/tasks", icon: "📝", name: "Todo List" },
    { path: "/important", icon: "⭐", name: "Important" },
    { path: "/analytics", icon: "📊", name: "Analytics" },
    { path: "/settings", icon: "⚙️", name: "Settings" },
  ];

  return (
    <aside className="sidebar">

      <div className="brand">
        <div className="brand-logo">✓</div>

        <div>
          <h2>Taskora</h2>
          <p>Plan • Focus • Achieve</p>
        </div>
      </div>

      <div className="menu-title">MAIN MENU</div>

      <nav>
        {menu.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={
              location.pathname === item.path
                ? "nav-link active"
                : "nav-link"
            }
          >
            <span>{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="sidebar-bottom">

        <div className="profile">
          <div className="profile-img">BP</div>

          <div>
            <strong>velvizhi s</strong>
            <small>CSE Cyber Security</small>
          </div>
        </div>

        <button
          className="sidebar-theme"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>

      </div>
    </aside>
  );
}

/* ================= TOP BAR ================= */

function TopBar() {
  const location = useLocation();

  const titles = {
    "/": "Dashboard",
    "/calendar": "Calendar",
    "/tasks": "Todo List",
    "/important": "Important Tasks",
    "/analytics": "Analytics",
    "/settings": "Settings",
  };

  return (
    <header className="topbar">

      <div>
        <span className="page-label">TASKORA</span>
        <h2>{titles[location.pathname]}</h2>
      </div>

      <div className="top-actions">

        <button className="icon-btn">
          🔔
        </button>

        <div className="user-avatar">
          BP
        </div>

      </div>

    </header>
  );
}

/* ================= DASHBOARD ================= */

function Dashboard({ tasks }) {

  const completed = tasks.filter(t => t.completed).length;
  const pending = tasks.filter(t => !t.completed).length;
  const important = tasks.filter(t => t.important).length;

  return (
    <div className="page">

      <div className="hero">

        <div>
          <span>FRIDAY, SEPTEMBER 25, 2026</span>

          <h1>
            Good Morning, velvizhi 👋
          </h1>

          <p>
            Organize your day and make it productive.
          </p>
        </div>

        <div className="hero-date">
          <strong>25</strong>
          <span>SEP</span>
        </div>

      </div>

      {/* STAT CARDS */}

      <div className="stats">

        <div className="stat-card">
          <div className="stat-icon purple">📝</div>
          <div>
            <h2>{tasks.length}</h2>
            <p>Total Tasks</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon green">✓</div>
          <div>
            <h2>{completed}</h2>
            <p>Completed</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon orange">⏳</div>
          <div>
            <h2>{pending}</h2>
            <p>Pending</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon yellow">⭐</div>
          <div>
            <h2>{important}</h2>
            <p>Important</p>
          </div>
        </div>

      </div>

      {/* DASHBOARD CONTENT */}

      <div className="dashboard-grid">

        <div className="dashboard-card">

          <div className="card-heading">
            <div>
              <h2>Today's Tasks</h2>
              <p>Your schedule for today</p>
            </div>

            <Link to="/tasks" className="small-link">
              View All →
            </Link>
          </div>

          <div className="mini-task-list">

            {tasks.slice(0, 4).map(task => (

              <div className="mini-task" key={task.id}>

                <div className={
                  task.completed
                    ? "task-check checked"
                    : "task-check"
                }>
                  {task.completed ? "✓" : ""}
                </div>

                <div className="mini-task-info">

                  <strong>{task.title}</strong>

                  <span>
                    📅 {task.date}
                  </span>

                </div>

                <span className={
                  `priority ${task.priority.toLowerCase()}`
                }>
                  {task.priority}
                </span>

              </div>

            ))}

          </div>

        </div>

        {/* PRODUCTIVITY */}

        <div className="dashboard-card productivity">

          <h2>Today's Productivity</h2>

          <div className="circle-progress">

            <div>
              <strong>
                {tasks.length
                  ? Math.round((completed / tasks.length) * 100)
                  : 0}%
              </strong>

              <span>Completed</span>
            </div>

          </div>

          <p>
            Keep going! You're doing great 💪
          </p>

        </div>

      </div>

    </div>
  );
}

/* ================= CALENDAR ================= */

function Calendar({ tasks }) {

  const [selectedDate, setSelectedDate] =
    useState("2026-09-25");

  const days = Array.from(
    { length: 30 },
    (_, i) => i + 1
  );

  return (
    <div className="page">

      <div className="page-header">

        <div>
          <span>YOUR SCHEDULE</span>
          <h1>September 2026</h1>
        </div>

        <button className="today-btn">
          Today
        </button>

      </div>

      <div className="calendar">

        <div className="weekdays">
          {[
            "SUN",
            "MON",
            "TUE",
            "WED",
            "THU",
            "FRI",
            "SAT"
          ].map(day => (
            <div key={day}>{day}</div>
          ))}
        </div>

        <div className="calendar-days">

          {days.map(day => {

            const date =
              `2026-09-${String(day).padStart(2, "0")}`;

            const dayTasks =
              tasks.filter(t => t.date === date);

            return (

              <div
                key={day}
                className={
                  selectedDate === date
                    ? "calendar-day selected"
                    : "calendar-day"
                }
                onClick={() => setSelectedDate(date)}
              >

                <span className="day-number">
                  {day}
                </span>

                {dayTasks.map(task => (

                  <div
                    key={task.id}
                    className={
                      `calendar-event ${task.priority.toLowerCase()}`
                    }
                  >
                    {task.title}
                  </div>

                ))}

              </div>

            );
          })}

        </div>

      </div>

      <div className="selected-task-box">

        <h2>
          Tasks on {selectedDate}
        </h2>

        {tasks
          .filter(task => task.date === selectedDate)
          .map(task => (

            <div className="selected-task" key={task.id}>

              <span>✓</span>

              <div>
                <strong>{task.title}</strong>
                <small>{task.priority} Priority</small>
              </div>

            </div>

          ))}

      </div>

    </div>
  );
}

/* ================= TODO PAGE ================= */

function TodoList({ tasks, setTasks }) {

  const [input, setInput] = useState("");
  const [priority, setPriority] = useState("Medium");

  const addTask = () => {

    if (!input.trim()) return;

    const newTask = {
      id: Date.now(),
      title: input,
      date: "2026-09-25",
      priority,
      completed: false,
      important: false,
    };

    setTasks([...tasks, newTask]);

    setInput("");
  };

  const toggleTask = id => {

    setTasks(
      tasks.map(task =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed
            }
          : task
      )
    );

  };

  const deleteTask = id => {

    setTasks(
      tasks.filter(task => task.id !== id)
    );

  };

  return (
    <div className="page">

      <div className="page-header">

        <div>
          <span>TASK MANAGEMENT</span>
          <h1>My Todo List 📝</h1>
        </div>

        <div className="task-count">
          {tasks.length} Tasks
        </div>

      </div>

      {/* ADD TASK */}

      <div className="add-task-box">

        <input
          type="text"
          placeholder="What needs to be done?"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => {
            if (e.key === "Enter") addTask();
          }}
        />

        <select
          value={priority}
          onChange={e => setPriority(e.target.value)}
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        <button onClick={addTask}>
          + Add Task
        </button>

      </div>

      {/* TASKS */}

      <div className="todo-container">

        {tasks.map(task => (

          <div
            className={
              task.completed
                ? "todo-item completed"
                : "todo-item"
            }
            key={task.id}
          >

            <button
              className={
                task.completed
                  ? "todo-check done"
                  : "todo-check"
              }
              onClick={() => toggleTask(task.id)}
            >
              {task.completed ? "✓" : ""}
            </button>

            <div className="todo-content">

              <h3>{task.title}</h3>

              <div>
                📅 {task.date}

                <span className={
                  `priority ${task.priority.toLowerCase()}`
                }>
                  {task.priority}
                </span>
              </div>

            </div>

            <button
              className="delete-btn"
              onClick={() => deleteTask(task.id)}
            >
              🗑️
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

/* ================= IMPORTANT ================= */

function Important({ tasks, setTasks }) {

  const importantTasks =
    tasks.filter(task => task.important);

  const toggleImportant = id => {

    setTasks(
      tasks.map(task =>
        task.id === id
          ? {
              ...task,
              important: !task.important
            }
          : task
      )
    );

  };

  return (

    <div className="page">

      <div className="page-header">

        <div>
          <span>FOCUS AREA</span>
          <h1>Important Tasks ⭐</h1>
        </div>

      </div>

      <div className="important-grid">

        {importantTasks.map(task => (

          <div className="important-card" key={task.id}>

            <div className="important-top">

              <span>⭐</span>

              <button
                onClick={() =>
                  toggleImportant(task.id)
                }
              >
                ★
              </button>

            </div>

            <h2>{task.title}</h2>

            <p>
              📅 {task.date}
            </p>

            <span className={
              `priority ${task.priority.toLowerCase()}`
            }>
              {task.priority}
            </span>

          </div>

        ))}

      </div>

    </div>

  );
}

/* ================= ANALYTICS ================= */

function Analytics({ tasks }) {

  const completed =
    tasks.filter(t => t.completed).length;

  const pending =
    tasks.filter(t => !t.completed).length;

  const high =
    tasks.filter(t => t.priority === "High").length;

  return (

    <div className="page">

      <div className="page-header">

        <div>
          <span>PERFORMANCE</span>
          <h1>Analytics 📊</h1>
        </div>

      </div>

      <div className="analytics-cards">

        <div>
          <span>Completed</span>
          <strong>{completed}</strong>
          <small>Tasks finished</small>
        </div>

        <div>
          <span>Pending</span>
          <strong>{pending}</strong>
          <small>Tasks remaining</small>
        </div>

        <div>
          <span>High Priority</span>
          <strong>{high}</strong>
          <small>Need attention</small>
        </div>

      </div>

      <div className="chart-card">

        <h2>Weekly Productivity</h2>

        <div className="bars">

          {[40, 65, 45, 80, 55, 90, 70].map(
            (height, index) => (

              <div className="bar-wrapper" key={index}>

                <div
                  className="bar"
                  style={{
                    height: `${height}%`
                  }}
                ></div>

                <span>
                  {
                    [
                      "Mon",
                      "Tue",
                      "Wed",
                      "Thu",
                      "Fri",
                      "Sat",
                      "Sun"
                    ][index]
                  }
                </span>

              </div>

            )
          )}

        </div>

      </div>

    </div>

  );
}

/* ================= SETTINGS ================= */

function Settings({ darkMode, setDarkMode }) {

  return (

    <div className="page">

      <div className="page-header">

        <div>
          <span>APP PREFERENCES</span>
          <h1>Settings ⚙️</h1>
        </div>

      </div>

      <div className="settings">

        <div className="setting-row">

          <div>
            <h3>Dark Mode</h3>
            <p>
              Switch between light and dark appearance.
            </p>
          </div>

          <button
            className={
              darkMode
                ? "switch on"
                : "switch"
            }
            onClick={() =>
              setDarkMode(!darkMode)
            }
          >
            <span></span>
          </button>

        </div>

        <div className="setting-row">

          <div>
            <h3>Notifications</h3>
            <p>
              Receive reminders for upcoming tasks.
            </p>
          </div>

          <button className="switch on">
            <span></span>
          </button>

        </div>

        <div className="setting-row">

          <div>
            <h3>Profile</h3>
            <p>
              Manage your Taskora profile.
            </p>
          </div>

          <button className="edit-btn">
            Edit
          </button>

        </div>

      </div>

    </div>

  );
}

/* ================= MAIN APP ================= */

function App() {

  const [tasks, setTasks] =
    useState(initialTasks);

  const [darkMode, setDarkMode] =
    useState(false);

  return (

    <BrowserRouter>

      <div className={
        darkMode
          ? "app dark"
          : "app"
      }>

        <Sidebar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        <main className="main">

          <TopBar />

          <Routes>

            <Route
              path="/"
              element={
                <Dashboard tasks={tasks} />
              }
            />

            <Route
              path="/calendar"
              element={
                <Calendar tasks={tasks} />
              }
            />

            <Route
              path="/tasks"
              element={
                <TodoList
                  tasks={tasks}
                  setTasks={setTasks}
                />
              }
            />

            <Route
              path="/important"
              element={
                <Important
                  tasks={tasks}
                  setTasks={setTasks}
                />
              }
            />

            <Route
              path="/analytics"
              element={
                <Analytics tasks={tasks} />
              }
            />

            <Route
              path="/settings"
              element={
                <Settings
                  darkMode={darkMode}
                  setDarkMode={setDarkMode}
                />
              }
            />

          </Routes>

        </main>

      </div>

    </BrowserRouter>

  );
}

export default App;