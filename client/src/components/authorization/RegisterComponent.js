/**
 * Author: William Sparr
 * Date 25e May
 *
 * This file is responsible for handling the Login functionality of the page.
 * Overall, this component handles user input, performs registration requests to a specified endpoint, and provides feedback to the user based on the registration status.
 *
 */

import { useState } from "react";
import booksterLogo from "../../assets/bookster1.png";

export function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [registrationStatus, setRegistrationStatus] = useState(null);

  const registerUser = async () => {
    if (username.length < 4 || password.length < 4) {
      setRegistrationStatus("Invalid length");
      return;
    }

    try {
      await fetch("http://127.0.0.1:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      setRegistrationStatus("success");
    } catch (error) {
      setRegistrationStatus("failure");
    }
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    registerUser();
  };

  return (
    <div className="auth-container">
      <div className="logo-container">
        <img className="bookster-logo" alt="booksterlogo" src={booksterLogo} />
        <h2 className="login-logo">Register</h2>
      </div>
      <form onSubmit={handleSubmit} className="auth-form-container">
        <div className="input-container">
          <label htmlFor="username-input" className="form-label">
            Username:
          </label>
          <input
            id="username-input"
            type="text"
            value={username}
            onChange={handleUsernameChange}
            className="form-input"
          />
        </div>
        <div className="input-container">
          <label htmlFor="password-input" className="form-label">
            Password:
          </label>
          <input
            id="password-input"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className="form-input"
          />
        </div>

        <button type="submit" className="submit-btn">
          Register new account
        </button>
        <p className="switch-form-btn">
          Already have an account? Sign in <a href="/login">here!</a>
        </p>

        {registrationStatus === "success" && (
          <p className="status-message">Account successfully created</p>
        )}
        {registrationStatus === "failure" && (
          <p className="status-message">
            Registration failed. Please try again
          </p>
        )}
        {registrationStatus === "Invalid length" && (
          <p className="status-message">
            Username and password must be at least 4 characters long
          </p>
        )}
      </form>
    </div>
  );
}
