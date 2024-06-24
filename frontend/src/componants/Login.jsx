import { useState } from "react";
import axios from "axios";
import "../style/Auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "http://localhost:9999/api/auth/login";
    const payload = { email, password };
    try {
      const response = await axios.post(url, payload);
      const token = response.data.token;
      localStorage.setItem("authToken", token);
      window.location.href = "/dashboard";
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="input-group">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="auth-input"
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="auth-input"
          />
        </div>
        <button
          type="submit"
          className="auth-button"
          onClick={() => (window.location.href = "/dashbord")}
        >
          Login
        </button>
        <button
          type="button"
          onClick={() => (window.location.href = "/register")}
          className="switch-button"
        >
          Switch to Register
        </button>
      </form>
    </div>
  );
};

export default Login;
