import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function LoginComponent() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState(null);

  const loginUser = async () => {
    try {
      const response = await fetch("http://127.0.0.1:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const { accessToken } = await response.json();
        localStorage.setItem("accessToken", accessToken);
        setLoginStatus("success");
      } else {
        setLoginStatus("failure");
      }
    } catch (error) {
      setLoginStatus("failure");
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
    loginUser();
  };

  // Retrieve the accessToken from localStorage
  const accessToken = localStorage.getItem("accessToken");

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
          type="text"
          value={password}
          onChange={handlePasswordChange}
        />

        <button type="submit">Login</button>

        {loginStatus === "success" && <p>Successfully signed in</p>}

        {loginStatus === "failure" && <p>Login failed. Please try again</p>}
      </form>

      {accessToken && <p>Access Token: {accessToken}</p>}
      {/* Use the accessToken for other functionality */}
    </div>
  );
}
