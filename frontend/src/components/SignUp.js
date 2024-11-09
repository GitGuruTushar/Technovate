import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
// import "./SignUp.css"; // Import the CSS file

function SignUp() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Individual");
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const route = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Prepare data to be sent in the request
    const userData = {
      fullName,
      email,
      password,
      role,
    };
    try {
      // Send data as JSON in a POST request
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v4/users/register`,
        userData,
        {
          headers: {
            "Content-Type": "application/json", // Specify JSON content type
          },
        }
      );

      if (response.status === 201) {
        setMessage("Sign-up successful!");
      } else {
        setMessage("Sign-up failed.");
      }
    } catch (error) {
      console.error("Error during sign-up:", error);
      setMessage("Sign-up failed. Please try again.");
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    route("/login"); // Redirect to login page after closing the modal
  };

  return (
    <div className="signup-page">
      {showModal && <Modal message={message} onClose={closeModal} />}
      <div className="signup-container">
        <h1>Sign Up</h1>
        <form onSubmit={handleSignUp}>
          <div className="input-group">
            <label style={{ color: "#fff" }} htmlFor="fullName">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label style={{ color: "#fff" }} htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label style={{ color: "#fff" }} htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              minLength="8"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label style={{ color: "#fff" }} htmlFor="role">
              Role
            </label>
            <select
              id="role"
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="Individual">Individual</option>
              <option value="Organisation">Organisation</option>
            </select>
          </div>
          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
