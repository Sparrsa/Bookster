import { useState } from "react";

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
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <label htmlFor="username-input">Username:</label>
      <input
        id="username-input"
        type="text"
        value={username}
        onChange={handleUsernameChange}
      />

      <label htmlFor="password-input">Password:</label>
      <input
        id="password-input"
        type="password"
        value={password}
        onChange={handlePasswordChange}
      />

      <button type="submit">Register new account</button>
      <p>
        Already have an account? Sign in <a href="/login">here!</a>
      </p>

      {registrationStatus === "success" && <p>Account successfully created</p>}

      {registrationStatus === "failure" && (
        <p>Registration failed. Please try again</p>
      )}
      {registrationStatus === "Invalid length" && (
        <p>Username and password must be at least 4 characters long</p>
      )}
    </form>
  );
}
