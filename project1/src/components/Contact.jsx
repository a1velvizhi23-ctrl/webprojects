function Contact({ email, phone, linkedin, github }) {
  return (
    <section className="card contact">
      <h2>Contact Details</h2>

      <ul>
        <li>📧 Email: {email}</li>
        <li>📞 Phone: {phone}</li>
        <li>💼 LinkedIn: {linkedin}</li>
        <li>💻 GitHub: {github}</li>
      </ul>
    </section>
  );
}

export default Contact;