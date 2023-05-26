import { useState } from "react";
// import { useNavigate } from "react-router-dom";

export function Login() {
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
    // window.location.reload();
  };

  // Retrieve the accessToken from localStorage
  localStorage.getItem("accessToken");

  return (
    <div className="login-container">
      <div className="logo-container">
        <h2 className="login-logo">Login</h2>
      </div>
      <form onSubmit={handleSubmit} className="login-form-container">
        <div className="input-container">
          <label className="form-label" htmlFor="username-input">
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
          <label className="form-label" htmlFor="password-input">
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
        <p className="register-btn">
          No account? Sign up <a href="/register">here!</a>
        </p>

        <button className="submit-btn" type="submit">
          Sign in
        </button>

        {loginStatus === "success" && <p>Successfully signed in</p>}

        {loginStatus === "failure" && <p>Login failed. Please try again</p>}
      </form>
    </div>
  );
}
