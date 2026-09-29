import React from "react";
import "./App.css";

import drawingImage from "./assets/drawing.jpg";
import musicImage from "./assets/music.jpg";
import readingImage from "./assets/reading.jpg";

function App() {
  const hobbies = [
    {
      image: drawingImage,
      title: "Drawing",
      description:
        "I love expressing my creativity through drawing and artwork.",
      tag: "Creative",
      level: "Intermediate",
    },
    {
      image: musicImage,
      title: "Music",
      description:
        "Listening to music helps me relax and enjoy my free time.",
      tag: "Entertainment",
      level: "Advanced",
    },
    {
      image: readingImage,
      title: "Reading",
      description:
        "I enjoy reading books and learning new things in my free time.",
      tag: "Learning",
      level: "Beginner",
    },
  ];

  return (
    <div className="app">
      <h1 className="main-title">My Hobbies</h1>

      <p className="main-description">
        Things I love doing in my free time
      </p>

      <div className="hobby-container">
        {hobbies.map((hobby, index) => (
          <div className="hobby-card" key={index}>

            <img
              src={hobby.image}
              alt={hobby.title}
              className="hobby-image"
            />

            <h2 className="hobby-title">
              {hobby.title}
            </h2>

            <p className="hobby-description">
              {hobby.description}
            </p>

            <span className="hobby-tag">
              {hobby.tag}
            </span>

            <div className="hobby-footer">
              <span className="hobby-level">
                {hobby.level}
              </span>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

