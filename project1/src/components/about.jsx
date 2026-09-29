function About({ introduction }) {
  return (
    <section className="card">
      <h2>About Me</h2>

      <p className="about-text">
        {introduction}
      </p>
    </section>
  );
}

export default About;