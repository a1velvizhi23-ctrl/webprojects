function Profile({
  name,
  age,
  department,
  college,
  location
}) {
  return (
    <section className="card profile">
      <h2>Profile</h2>

      <ul>
        <li>
          <b>Name:</b> {name}
        </li>

        <li>
          <b>Age:</b> {age}
        </li>

        <li>
          <b>Department:</b> {department}
        </li>

        <li>
          <b>College:</b> {college}
        </li>

        <li>
          <b>Location:</b> {location}
        </li>
      </ul>
    </section>
  );
}

export default Profile;