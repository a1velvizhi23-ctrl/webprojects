
import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const initialForm = {
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    permanentAddress: "",
    currentAddress: "",
    sameAddress: false,
    photo: null,
  };

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  // Extra features
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [photoPreview, setPhotoPreview] = useState("");

  // ================================
  // LOAD SAVED DATA
  // ================================
  useEffect(() => {
    const savedData = localStorage.getItem("userFormData");

    if (savedData) {
      try {
        const data = JSON.parse(savedData);

        setForm({
          ...initialForm,
          ...data,
          photo: null,
        });
      } catch (error) {
        console.error("Failed to load saved data:", error);
      }
    }
  }, []);

  // ================================
  // NORMAL INPUT CHANGE
  // ================================
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setSuccess("");

    // Same address
    if (name === "sameAddress" && checked) {
      setForm((prev) => ({
        ...prev,
        sameAddress: true,
        currentAddress: prev.permanentAddress,
      }));
    }

    if (name === "sameAddress" && !checked) {
      setForm((prev) => ({
        ...prev,
        sameAddress: false,
        currentAddress: "",
      }));
    }
  };

  // ================================
  // PERMANENT ADDRESS
  // ================================
  const handlePermanentAddress = (e) => {
    const value = e.target.value;

    setForm((prev) => ({
      ...prev,
      permanentAddress: value,
      currentAddress: prev.sameAddress
        ? value
        : prev.currentAddress,
    }));

    setErrors((prev) => ({
      ...prev,
      permanentAddress: "",
      currentAddress: "",
    }));
  };

  // ================================
  // PHOTO UPLOAD
  // ================================
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      setForm((prev) => ({
        ...prev,
        photo: null,
      }));

      setPhotoPreview("");
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
    ];

    // File type validation
    if (!allowedTypes.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        photo:
          "Only JPG, JPEG and PNG images are allowed.",
      }));

      e.target.value = "";

      setForm((prev) => ({
        ...prev,
        photo: null,
      }));

      setPhotoPreview("");
      return;
    }

    // File size validation
    if (file.size > 2 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        photo: "Photo size must be less than 2MB.",
      }));

      e.target.value = "";

      setForm((prev) => ({
        ...prev,
        photo: null,
      }));

      setPhotoPreview("");
      return;
    }

    setForm((prev) => ({
      ...prev,
      photo: file,
    }));

    setErrors((prev) => ({
      ...prev,
      photo: "",
    }));

    // Image preview
    const imageURL = URL.createObjectURL(file);
    setPhotoPreview(imageURL);
  };

  // ================================
  // PASSWORD STRENGTH
  // ================================
  const getPasswordStrength = (password) => {
    if (!password) return "";

    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[@$!%*?&]/.test(password)) score++;

    if (score <= 1) return "Weak";
    if (score === 2 || score === 3) return "Medium";

    return "Strong";
  };

  // ================================
  // FORM VALIDATION
  // ================================
  const validate = () => {
    const newErrors = {};

    // Name
    if (!form.name.trim()) {
      newErrors.name = "Name is required.";
    } else if (!/^[A-Za-z ]+$/.test(form.name)) {
      newErrors.name =
        "Name should contain only letters.";
    } else if (form.name.trim().length < 3) {
      newErrors.name =
        "Name must contain at least 3 characters.";
    }

    // Email
    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    ) {
      newErrors.email =
        "Enter a valid email address.";
    }

    // Phone
    if (!form.phone.trim()) {
      newErrors.phone =
        "Mobile number is required.";
    } else if (!/^[0-9]+$/.test(form.phone)) {
      newErrors.phone =
        "Mobile number should contain numbers only.";
    } else if (form.phone.length !== 10) {
      newErrors.phone =
        "Mobile number must contain exactly 10 digits.";
    }

    // Password
    if (!form.password) {
      newErrors.password =
        "New password is required.";
    } else if (form.password.length < 8) {
      newErrors.password =
        "Password must contain at least 8 characters.";
    } else if (!/(?=.*[A-Z])/.test(form.password)) {
      newErrors.password =
        "Password must contain at least one uppercase letter.";
    } else if (!/(?=.*[0-9])/.test(form.password)) {
      newErrors.password =
        "Password must contain at least one number.";
    } else if (!/(?=.*[@$!%*?&])/.test(form.password)) {
      newErrors.password =
        "Password must contain at least one special character.";
    }

    // Confirm password
    if (!form.confirmPassword) {
      newErrors.confirmPassword =
        "Please confirm your password.";
    } else if (
      form.password !== form.confirmPassword
    ) {
      newErrors.confirmPassword =
        "Passwords do not match.";
    }

    // Permanent address
    if (!form.permanentAddress.trim()) {
      newErrors.permanentAddress =
        "Permanent address is required.";
    } else if (
      form.permanentAddress.trim().length < 10
    ) {
      newErrors.permanentAddress =
        "Please enter a complete permanent address.";
    }

    // Current address
    if (!form.currentAddress.trim()) {
      newErrors.currentAddress =
        "Current address is required.";
    } else if (
      form.currentAddress.trim().length < 10
    ) {
      newErrors.currentAddress =
        "Please enter a complete current address.";
    }

    // Photo
    if (!form.photo) {
      newErrors.photo =
        "Please upload your photo.";
    }

    return newErrors;
  };

  // ================================
  // SUBMIT
  // ================================
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // Save data
      localStorage.setItem(
        "userFormData",
        JSON.stringify({
          ...form,
          photo: form.photo
            ? form.photo.name
            : null,
        })
      );

      setSuccess(
        "🎉 Form submitted and saved successfully!"
      );

      console.log("Form Data:", form);
    } else {
      setSuccess("");

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  // ================================
  // RESET
  // ================================
  const handleReset = () => {
    setForm(initialForm);
    setErrors({});
    setSuccess("");
    setPhotoPreview("");

    localStorage.removeItem("userFormData");

    const fileInput =
      document.getElementById("photo");

    if (fileInput) {
      fileInput.value = "";
    }
  };

  // ================================
  // UI
  // ================================
  return (
    <div className="page">
      <div className="form-container">

        {/* HEADER */}
        <div className="form-header">
          <div className="icon-circle">📝</div>

          <h1>Form Validation</h1>

          <p>
            Please fill in all the details carefully
          </p>
        </div>

        {/* SUCCESS */}
        {success && (
          <div className="success-message">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          {/* ================= PERSONAL ================= */}
          <div className="section">
            <h2>👤 Personal Information</h2>

            {/* NAME */}
            <div className="form-group">
              <label>
                Full Name <span>*</span>
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={form.name}
                onChange={handleChange}
              />

              {errors.name && (
                <p className="error">
                  ⚠ {errors.name}
                </p>
              )}
            </div>

            {/* EMAIL */}
            <div className="form-group">
              <label>
                Email Address <span>*</span>
              </label>

              <input
                type="email"
                name="email"
                placeholder="example@gmail.com"
                value={form.email}
                onChange={handleChange}
              />

              {errors.email && (
                <p className="error">
                  ⚠ {errors.email}
                </p>
              )}
            </div>

            {/* PHONE */}
            <div className="form-group">
              <label>
                Mobile Number <span>*</span>
              </label>

              <input
                type="text"
                name="phone"
                placeholder="Enter 10 digit mobile number"
                value={form.phone}
                maxLength="10"
                onChange={(e) => {
                  const value = e.target.value;

                  if (/^\d*$/.test(value)) {
                    setForm((prev) => ({
                      ...prev,
                      phone: value,
                    }));

                    setErrors((prev) => ({
                      ...prev,
                      phone: "",
                    }));
                  }
                }}
              />

              <small>
                Only numbers are allowed
              </small>

              {errors.phone && (
                <p className="error">
                  ⚠ {errors.phone}
                </p>
              )}
            </div>
          </div>

          {/* ================= PASSWORD ================= */}
          <div className="section">
            <h2>🔐 Password Security</h2>

            {/* PASSWORD */}
            <div className="form-group">
              <label>
                New Password <span>*</span>
              </label>

              <div className="password-box">
                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  placeholder="Enter new password"
                  value={form.password}
                  onChange={handleChange}
                />

                <button
                  type="button"
                  className="show-btn"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword
                    ? "🙈"
                    : "👁️"}
                </button>
              </div>

              <small>
                Minimum 8 characters, uppercase,
                number & special character required.
              </small>

              {/* PASSWORD STRENGTH */}
              {form.password && (
                <div className="password-strength">
                  Password Strength:

                  <strong
                    className={getPasswordStrength(
                      form.password
                    ).toLowerCase()}
                  >
                    {getPasswordStrength(
                      form.password
                    )}
                  </strong>
                </div>
              )}

              {errors.password && (
                <p className="error">
                  ⚠ {errors.password}
                </p>
              )}
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="form-group">
              <label>
                Confirm Password <span>*</span>
              </label>

              <div className="password-box">
                <input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  name="confirmPassword"
                  placeholder="Re-enter your password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                />

                <button
                  type="button"
                  className="show-btn"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                >
                  {showConfirmPassword
                    ? "🙈"
                    : "👁️"}
                </button>
              </div>

              {errors.confirmPassword && (
                <p className="error">
                  ⚠ {errors.confirmPassword}
                </p>
              )}
            </div>
          </div>

          {/* ================= ADDRESS ================= */}
          <div className="section">
            <h2>🏠 Address Information</h2>

            {/* PERMANENT */}
            <div className="form-group">
              <label>
                Permanent Address <span>*</span>
              </label>

              <textarea
                name="permanentAddress"
                rows="4"
                placeholder="Enter your permanent address"
                value={form.permanentAddress}
                onChange={
                  handlePermanentAddress
                }
              />

              {errors.permanentAddress && (
                <p className="error">
                  ⚠ {errors.permanentAddress}
                </p>
              )}
            </div>

            {/* SAME ADDRESS */}
            <div className="checkbox-group">
              <input
                type="checkbox"
                name="sameAddress"
                id="sameAddress"
                checked={form.sameAddress}
                onChange={handleChange}
              />

              <label htmlFor="sameAddress">
                Current address is same as
                permanent address
              </label>
            </div>

            {/* CURRENT */}
            <div className="form-group">
              <label>
                Current Address <span>*</span>
              </label>

              <textarea
                name="currentAddress"
                rows="4"
                placeholder="Enter your current address"
                value={form.currentAddress}
                onChange={handleChange}
                disabled={form.sameAddress}
              />

              {errors.currentAddress && (
                <p className="error">
                  ⚠ {errors.currentAddress}
                </p>
              )}
            </div>
          </div>

          {/* ================= PHOTO ================= */}
          <div className="section">
            <h2>📷 Profile Photo</h2>

            <div className="form-group">
              <label>
                Upload Photo <span>*</span>
              </label>

              <div className="file-box">
                <input
                  type="file"
                  id="photo"
                  accept=".jpg,.jpeg,.png"
                  onChange={handlePhotoChange}
                />
              </div>

              <small>
                Allowed formats: JPG, JPEG, PNG |
                Maximum size: 2MB
              </small>

              {form.photo && (
                <p className="file-success">
                  ✓ {form.photo.name}
                </p>
              )}

              {/* PHOTO PREVIEW */}
              {photoPreview && (
                <div className="photo-preview">
                  <img
                    src={photoPreview}
                    alt="Profile Preview"
                  />

                  <p>Photo Preview</p>
                </div>
              )}

              {errors.photo && (
                <p className="error">
                  ⚠ {errors.photo}
                </p>
              )}
            </div>
          </div>

          {/* ================= BUTTONS ================= */}
          <div className="button-container">

            <button
              type="submit"
              className="submit-btn"
            >
              ✓ Submit
            </button>

            <button
              type="button"
              className="reset-btn"
              onClick={handleReset}
            >
              ↻ Reset / Clear
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}

export default App;

